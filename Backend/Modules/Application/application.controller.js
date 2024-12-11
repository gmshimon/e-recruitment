import Application from './application.model.js'
import path from 'path'
import fs from 'fs'
import { pipeline } from '@huggingface/transformers'
import axios from 'axios'
import { fileURLToPath } from 'url'
import { PdfDataReader } from 'pdf-data-parser'
// import ResumeParser from 'simple-resume-parser'
import ResumeParser from 'resume-parser'
import ATSChecker from '../../Utilis/ATSChecker/ATSChecker.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const parsePdfToJson = async (filePath) => {
//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const pdfData = await PdfParse(dataBuffer);

//     // Split text into lines for better parsing
//     const lines = pdfData.text.split('\n');

//     // Extracted sections (customize based on resume layout)
//     const jsonOutput = {
//       personalDetails: {},
//       education: [],
//       experience: [],
//       skills: [],
//       projects: [],
//       awards: [],
//     };

//     let currentSection = null;

//     lines.forEach((line) => {
//       line = line.trim();
//       if (line === '') return; // Skip empty lines

//       // Detect section headers based on your resume format
//       if (line.includes('Education')) {
//         currentSection = 'education';
//       } else if (line.includes('Professional Experience')) {
//         currentSection = 'experience';
//       } else if (line.includes('Skills')) {
//         currentSection = 'skills';
//       } else if (line.includes('Projects')) {
//         currentSection = 'projects';
//       } else if (line.includes('Awards')) {
//         currentSection = 'awards';
//       } else {
//         // Populate current section
//         if (currentSection) {
//           jsonOutput[currentSection].push(line);
//         } else {
//           // Default to personal details if not in a section
//           const [key, value] = line.split(':').map((s) => s.trim());
//           if (key && value) {
//             jsonOutput.personalDetails[key] = value;
//           }
//         }
//       }
//     });

//     return jsonOutput;
//   } catch (error) {
//     console.error('Error parsing PDF:', error);
//     return null;
//   }
// };

// Function to parse skills
const parseSkills = skillsRaw => {
  return skillsRaw
    .split('\n') // Split by newlines
    .filter(
      skill =>
        !skill.startsWith('2022/') &&
        !skill.startsWith('The') &&
        !skill.startsWith(':')
    ) // Exclude invalid lines
    .map(skill => skill.trim()) // Trim whitespace
    .filter(skill => skill.length > 0) // Exclude empty lines
}

// Function to parse education
const parseEducation = (educationRaw) => {
  const lines = educationRaw.split('\n'); // Split the data by newline
  const educationEntries = [];
  let entry = [];

  // Group lines related to each education block
  for (const line of lines) {
    if (line.trim().match(/^\d{4}\/\d{2}.*–.*$/)) {
      // New education entry starts
      if (entry.length > 0) {
        educationEntries.push(entry);
        entry = [];
      }
    }
    entry.push(line.trim());
  }

  // Add the last entry if not already added
  if (entry.length > 0) {
    educationEntries.push(entry);
  }

  // Map grouped entries to structured data
  return educationEntries.map((entry) => {
    if (entry.length >= 4) {
      return {
        startEndDate: entry[0],
        location: entry[1],
        degree: entry[2],
        institution: entry[3],
      };
    }
    return null; // Ignore incomplete entries
  }).filter((e) => e !== null); // Remove null values

};

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

export const addNewMessage = async(req,res,next)=>{
  try {
    const {id} = req.params
  const { _id } = req.user
  const data = req.body
  data.createdBy = _id
  console.log(data)
  const isApplicationExist = await Application.findOne({_id: id})

  if(!isApplicationExist){
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

  const getApplication = await Application.findOne({_id: id}).populate({
    path: 'job'
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

export const getApplicantsOfJob = async(req,res,next)=>{
  try {
    const {job_id} = req.params
    const applicants = await Application.find({
      job:job_id
    }).populate({
      path: 'job'
    })
    .populate({
      path: 'candidate',
      populate: {
        path: 'education'
      }
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
    const { url } = req.body

    // Extract the file name from the URL
    const fileName = url.split('/')[6]
    if (!fileName) {
      throw new Error('Invalid URL format. Unable to extract file name.')
    }

    // Construct file path
    const filePath = path.join(__dirname, '../../images/User/resume/', fileName)
    // console.log('Resolved file path:', filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`)
    }

    // ResumeParser.parseResumeUrl(url)
    //   .then(file => {
    //     const skillsList = parseSkills(file.skills)

    //     // const educationString = file.education.join('');
    //     const educationList = parseEducation(file.education)
    //     const data ={
    //       skills: skillsList,
    //       education: educationList.slice(0,4)
    //     }
    //     console.log(data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

  const data = {
      jobDescription: "Looking for a skilled frontend developer to join our dynamic team.", 
      fullName: "John Doe", 
      aboutMe: "Passionate developer with over 5 years of experience in web development.", 
      skills: ["HTML", "CSS", "JavaScript", "React"],
       workExperience: ["Frontend Developer at ABC Corp", "Web Developer at XYZ Ltd"],
        education: ["B.Sc. in Computer Science", "M.Sc. in Software Engineering"],
         certifications: ["Certified ScrumMaster", "AWS Certified Solutions Architect"]
    }

    const result =  ATSChecker(data)

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
