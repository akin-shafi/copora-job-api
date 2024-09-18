import { Request, Response } from 'express';
import { ApplicationService } from '../services/ApplicationService';
import { OnboardingStatus } from '../constants';
import pdfParse from 'pdf-parse';

export class ApplicationController {

  // constructor() {
  //   this.autoFillApplicationFormWithUploadedResume = this.autoFillApplicationFormWithUploadedResume.bind(this);

  // }

  static async getOnboardingStatus(req: Request, res: Response) {
    console.log('Onboarding status route hit');
    const statuses = Object.values(OnboardingStatus);
    res.status(200).json({ success: true, data: statuses });
  }

  
  static async createApplication(req: Request, res: Response) {
    try {
      const result = await ApplicationService.createApplication(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getApplicationByNo(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getApplicationByNo(req.params.applicationNo);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateApplicationByNo(req: Request, res: Response) {
    try {
      const result = await ApplicationService.updateApplicationByNo(req.params.applicationNo, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteApplicationByNo(req: Request, res: Response) {
    try {
      await ApplicationService.deleteApplicationByNo(req.params.applicationNo);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getApplicantData(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getApplicantData(req.params.applicationNo);
      if (!result.user) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllApplicants(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getAllApplicants();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 // Method to handle auto-filling the application form using an uploaded resume
 static async autoFillApplicationFormWithUploadedResume(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    console.log("Received request to auto-fill form with resume.");
    console.log("Resume file received:", req.file.originalname);

    const resumeBuffer = req.file.buffer;
    console.log("Extracting text from resume buffer...");

    // Validate buffer
    if (!Buffer.isBuffer(resumeBuffer)) {
      throw new Error("Uploaded file is not a valid buffer");
    }

    // Extract text from resume PDF
    const resumeText = await pdfParse(resumeBuffer);
    console.log("Text extracted from resume:", resumeText.text);

    // Extract data from the resume text
    const extractedData = await ApplicationController.extractDataFromResume(resumeText.text);

    return res.status(200).json({
      message: 'Resume processed successfully',
      extractedData, 
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    return res.status(500).json({ message: 'Error processing resume', error: error.message });
  }
}

// Static function to extract specific fields from resume text
// static async extractDataFromResume(resumeText: string) {
//   console.log('Extracting data from resume text...');

//   const extractedData: any = {};

//   // Split the text into lines to analyze the content more accurately
//   const lines = resumeText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

//   // Extract Name (look for typical name-like patterns, ignoring sections like "Work Experience")
//   const nameRegex = /^[A-Z][a-z]+\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?$/;
//   const nameLine = lines.find(line => nameRegex.test(line));
//   if (nameLine) {
//     extractedData.name = nameLine;
//     console.log('Extracted name:', extractedData.name);
//   } else {
//     console.log('Name not found in resume text.');
//   }

//   // Extract Email
//   const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
//   const emailMatch = resumeText.match(emailRegex);
//   if (emailMatch) {
//     extractedData.email = emailMatch[0];
//     console.log('Extracted email:', extractedData.email);
//   } else {
//     console.log('Email not found in resume text.');
//   }

//   // Extract Phone Number (handling international, local, or different delimiters)
//   const phoneRegex = /\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
//   const phoneMatch = resumeText.match(phoneRegex);
//   if (phoneMatch) {
//     extractedData.phone = phoneMatch[0];
//     console.log('Extracted phone number:', extractedData.phone);
//   } else {
//     console.log('Phone number not found in resume text.');
//   }

//   // Extract Work Experience (find between headers like "Work Experience" and "Projects" or "Education")
//   const workExperienceRegex = /Work Experience[\s\S]+?(?=Projects|Education|Skills)/i;
//   const workExperienceMatch = resumeText.match(workExperienceRegex);
//   if (workExperienceMatch) {
//     extractedData.workExperience = workExperienceMatch[0].trim();
//     console.log('Extracted work experience:', extractedData.workExperience);
//   } else {
//     console.log('Work experience not found in resume text.');
//   }

//   // Extract Projects (similar to work experience)
//   const projectsRegex = /Projects[\s\S]+?(?=Education|Skills|Experience)/i;
//   const projectsMatch = resumeText.match(projectsRegex);
//   if (projectsMatch) {
//     extractedData.projects = projectsMatch[0].trim();
//     console.log('Extracted projects:', extractedData.projects);
//   } else {
//     console.log('Projects not found in resume text.');
//   }

//   // Optionally extract additional sections like "Skills", "Education"
//   // Example for "Skills"
//   const skillsRegex = /Skills[\s\S]+?(?=Projects|Work Experience|Education)/i;
//   const skillsMatch = resumeText.match(skillsRegex);
//   if (skillsMatch) {
//     extractedData.skills = skillsMatch[0].trim();
//     console.log('Extracted skills:', extractedData.skills);
//   }

//   return extractedData;
// }


static async extractDataFromResume(resumeText: string) {
  console.log('Extracting data from resume text...');

  const extractedData: any = {};

  // Step 1: Normalize the text (remove unnecessary whitespaces, standardize new lines)
  resumeText = resumeText.replace(/\r?\n|\r/g, "\n").trim();

  // Step 2: Extract Name (Account for name-like patterns or contextual cues)
  // Example: Look for "Name" or assume first proper noun is the name
  const nameRegex = /(?:Name[:\s]*)?([A-Z][a-z]+(?: [A-Z][a-z]+)+)/;
  const nameMatch = resumeText.match(nameRegex);
  if (nameMatch) {
    extractedData.name = nameMatch[1].trim();
    console.log('Extracted name:', extractedData.name);
  } else {
    console.log('Name not found in resume text.');
  }

  // Step 3: Extract Email (More precise regex for email)
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const emailMatch = resumeText.match(emailRegex);
  if (emailMatch) {
    extractedData.email = emailMatch[0].trim();
    console.log('Extracted email:', extractedData.email);
  } else {
    console.log('Email not found in resume text.');
  }

  // Step 4: Extract Phone Number (Handle different phone formats)
  const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
  const phoneMatch = resumeText.match(phoneRegex);
  if (phoneMatch) {
    extractedData.phone = phoneMatch[0].trim();
    console.log('Extracted phone number:', extractedData.phone);
  } else {
    console.log('Phone number not found in resume text.');
  }

  // Step 5: Extract Work Experience (Section-based extraction with keyword search)
  const workExperienceRegex = /(?:Work Experience|Experience|Professional Experience)[\s\S]+?(?=Projects|Education|Skills)/i;
  const workExperienceMatch = resumeText.match(workExperienceRegex);
  if (workExperienceMatch) {
    extractedData.workExperience = workExperienceMatch[0].trim();
    console.log('Extracted work experience:', extractedData.workExperience);
  } else {
    console.log('Work experience not found in resume text.');
  }

  // Step 6: Extract Projects (Similar logic as Work Experience)
  const projectsRegex = /(?:Projects|Project Experience|Key Projects)[\s\S]+?(?=Education|Skills|Certifications)/i;
  const projectsMatch = resumeText.match(projectsRegex);
  if (projectsMatch) {
    extractedData.projects = projectsMatch[0].trim();
    console.log('Extracted projects:', extractedData.projects);
  } else {
    console.log('Projects not found in resume text.');
  }

  // Step 7: Extract Education (Similar logic for education section)
  const educationRegex = /(?:Education|Academic Background|Degrees)[\s\S]+?(?=Skills|Certifications|Projects)/i;
  const educationMatch = resumeText.match(educationRegex);
  if (educationMatch) {
    extractedData.education = educationMatch[0].trim();
    console.log('Extracted education:', extractedData.education);
  } else {
    console.log('Education not found in resume text.');
  }

  // Step 8: Extract Skills
  const skillsRegex = /(?:Skills|Technical Skills|Core Competencies)[\s\S]+?(?=Education|Experience|Projects|Certifications)/i;
  const skillsMatch = resumeText.match(skillsRegex);
  if (skillsMatch) {
    extractedData.skills = skillsMatch[0].trim();
    console.log('Extracted skills:', extractedData.skills);
  } else {
    console.log('Skills not found in resume text.');
  }

  return extractedData;
}


  
}



