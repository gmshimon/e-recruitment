import { v2 as cloudinary } from 'cloudinary'

export const uploadApplicationV2 = async(file)=>{
    try {
     
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const b64 = Buffer.from(file.buffer).toString('base64')
        let dataURI = 'data:' + file.mimetype + ';base64,' + b64

        const result = await cloudinary.uploader.upload(dataURI, {
            asset_folder: 'E-Recruitement/application',
             resource_type: "raw", // Set to "raw" for PDF files
            format: "pdf" ,// Ensure file is saved as a PDF
            public_id:file?.originalname,
            overwrite: true,
        })
        console.log(result.url)
        return result.url
    } catch (error) {
        console.log('Error inside the cloudinary', error)
    }
}

export const deleteApplicationV2 = async (imageUrl) =>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
          })
          const urlParts = imageUrl.split("/");
          const filename = urlParts[urlParts.length - 1]; // Get last part (e.g., "sample123.jpg")
          const publicId = filename.split(".")[0];

          const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        throw error
    }
}