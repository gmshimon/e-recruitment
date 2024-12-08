import Application from "./application.model.js";

export const createApp = async(req,res,next)=>{
    try {
        const {_id} = req.user;
        const data = req.body;
        data.candidate = _id;

        const isApplicationExist = await Application.findOne({
            candidate:_id,
            job:data?.job
        })

        if(isApplicationExist){
            return res.status(400).json({
                status:"Failed",
                message:"Application already exists for this job",
            })
        }

        const result = await Application.create(data);

        res.status(200).json({
            status:"Success",
            message:"Application created successfully",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message,
        })
    }
}

export const changeApplicationStatus = async (req,res,next) =>{
    try {
        const {id} = req.params;
        const data = req.body;
        const result = await Application.updateOne(
            {_id:id},
            {
                $set:data
            }
        )

        res.status(200).json({
            status:"Success",
            message:"Application status updated successfully",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message,
        })
    }
}

export const getMyApplications = async(req,res,next)=>{
    try {
        const user = req.user;
        const applications = await Application.find({candidate:user._id}).populate({
            path: 'job'
        }).populate({
            path: 'candidate',
            populate:{
                path:'education'
            }
        })

        res.status(200).json({
            status:"Success",
            message:"My applications fetched successfully",
            data:applications
        })

    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message,
        })
    }
}