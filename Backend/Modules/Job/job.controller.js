import Job from './job.model.js'
import { ObjectId } from "mongodb";
export const createJob = async (req, res, next) => {
  try {
    const { _id } = req.user
    const data = req.body
    data.createdBy = _id
    const result = await Job.create(data)

    res.status(202).json({
      success: true,
      message: 'Job created successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: 'Failed',
      message: error.message
    })
  }
}

export const getJobList = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i' // case-insensitive search
          }
        }
      : {}

    const result = await Job.find(keyword).populate({
      path: 'createdBy',
      select: 'name email'
    })
    res.status(200).json({
      success: 'success',
      message: 'Job list fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const editJob = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const result = await Job.findOne({ _id: id })

    if (!result) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Job not found'
      })
    }

    const updateJob = await Job.updateOne(
        {_id:id},
        {
            $set:data
        }
    )
    
    res.status(200).json({
      status: 'success',
      message: 'Job updated successfully',

    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.status
    })
  }
}

export const getMyJob = async(req, res, next) => {
  try {
    const {_id} = req.user
    const result = await Job.find({createdBy: _id})

    res.status(200).json({
      success: 'success',
      message: 'My job list fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,

    })
  }
}

export const getJobID = async (req, res) => {
  try {
    const{id} = req.params

    const result = await Job.findOne({_id: id})

    res.status(200).json({
      success: 'success',
      message: 'Job fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    })
  }
}