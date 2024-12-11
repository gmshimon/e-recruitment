import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro'
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  // responseMimeType: 'text/plain'
}

const ATSChecker = async formData => {
const data = JSON.stringify(formData);
  const textPrompt = `
    Suppose ATS score in percentage is X% for someone with the following qualifications:

    ${data}
    
    So, if I ask "What is the estimated ATS score based on this information?", then just give the exact value of X, nothing else.

  `
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  // const result = await chatSession.sendMessage('Suppose ATS score in percentage is X% for someone with the following qualifications:\n\n{\njobDescription: "Looking for a professional frontend developer to join our dynamic team.",\nfullName: "John Doe",\naboutMe: "Passionate developer with over 5 years of experience in web development.",\nskills: ["HTML", "CSS", "JavaScript", "React"],\nworkExperience: ["Frontend Developer at ABC Corp", "Web Developer at XYZ Ltd"],\neducation: ["B.Sc. in Computer Science", "M.Sc. in Software Engineering"],\ncertifications: ["Certified ScrumMaster", "AWS Certified Solutions Architect"]\n}\n\nSo, if I ask "What is the estimated ATS score based on this information?", then just give the exact value of X, nothing else.')

  const result = await chatSession.sendMessage(JSON.stringify(textPrompt))
  console.log(result.response.text())
  return result.response.text()
}

export default ATSChecker
