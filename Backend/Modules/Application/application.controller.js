import Application from './application.model.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import ResumeParser from 'resume-parser'
import ATSChecker from '../../Utilis/ATSChecker/ATSChecker.js'
import {
  parseEducation,
  parseExperience,
  parseSkills
} from '../../Utilis/resumeDataExtraction.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createApp = async (req, res, next) => {
  try {
    const { _id } = req.user
    const data = req.body
    data.candidate = _id

    const isApplicationExist = await Application.findOne({
      candidate: _id,
      job: data?.job
    })

    if (isApplicationExist) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Application already exists for this job'
      })
    }

    const result = await Application.create(data)

    res.status(200).json({
      status: 'Success',
      message: 'Application created successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const changeApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const result = await Application.updateOne(
      { _id: id },
      {
        $set: data
      }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Application status updated successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const addNewMessage = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id } = req.user
    const data = req.body
    data.createdBy = _id
    const isApplicationExist = await Application.findOne({ _id: id })

    if (!isApplicationExist) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Application not found'
      })
    }

    const updateApplication = await Application.updateOne(
      {
        _id: id
      },
      {
        $push: {
          messages: data
        }
      }
    )

    const getApplication = await Application.findOne({ _id: id }).populate({
      path: 'job'
    })
      .populate({
        path:'messages',
        populate: {
          path: 'createdBy',
          select: 'name'
        }
      })

    res.status(200).json({
      status: 'Success',
      message: 'Message added successfully',
      data: getApplication
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getApplicantsOfJob = async (req, res, next) => {
  try {
    const { job_id } = req.params
    const applicants = await Application.find({
      job: job_id
    })
      .populate({
        path: 'job'
      })
      .populate({
        path: 'candidate',
        populate: {
          path: 'education'
        }
      })
      .populate({
        path: 'messages',
        populate: {
          path: 'createdBy',
          select: 'name'
        }
      })

    res.status(200).json({
      status: 'Success',
      message: 'Applicants fetched successfully',
      data: applicants
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getMyApplications = async (req, res, next) => {
  try {
    const user = req.user
    const applications = await Application.find({ candidate: user._id })
      .populate({
        path: 'job'
      })
      .populate({
        path: 'candidate',
        populate: {
          path: 'education'
        }
      })

    res.status(200).json({
      status: 'Success',
      message: 'My applications fetched successfully',
      data: applications
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const evaluateApplication = async (req, res, next) => {
  try {
    const { id } = req.params
    const isApplicationExist = await Application.findOne({ _id: id })

    if (!isApplicationExist) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Application not found'
      })
    }
    const url = isApplicationExist?.resume
    // // Extract the file name from the URL
    const fileName = url.split('/')[6]
    if (!fileName) {
      throw new Error('Invalid URL format. Unable to extract file name.')
    }

    // Construct file path
    const filePath = path.join(__dirname, '../../images/User/resume/', fileName)

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`)
    }

    const file = await ResumeParser.parseResumeUrl(url)

    const skillsList = parseSkills(file.skills)

    // const educationString = file.education.join('');
    const educationList = parseEducation(file.education)
    const workExperienceList = parseExperience(file.experience)
    const data = {
      jobDescription: isApplicationExist?.job?.description,
      fullName: isApplicationExist?.candidate?.name,
      skills: skillsList,
      education: educationList.slice(0, 4),
      workExperience: workExperienceList
    }
    const result = await ATSChecker(data)
    console.log(result);
    // Respond with the analysis result
    res.status(200).json({
      status: 'Success',
      message: 'Resume evaluated successfully',
      data:result
    })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}
