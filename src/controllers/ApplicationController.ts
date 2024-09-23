import { Request, Response } from 'express';
import { ApplicationService } from '../services/ApplicationService';
import { OnboardingStatus } from '../constants';
import pdfParse from 'pdf-parse';
import { Parser } from 'json2csv'; // Import json2csv for converting JSON to CSV
import PDFDocument from 'pdfkit'; // For PDF generation

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

// static async downloadApplicantDataCsv(req: Request, res: Response) {
//   try {
//     const { applicationNo } = req.params;
//     const applicantData = await ApplicationService.getApplicantData(applicationNo);
    
//     if (!applicantData) {
//       return res.status(404).json({ message: 'Applicant not found' });
//     }

//     // Combine applicant data into a single object
//     const combinedData = {
//       user: applicantData.user,
//       personalDetails: applicantData.personalDetails,
//       contactDetails: applicantData.contactDetails,
//       professionalDetails: applicantData.professionalDetails,
//       educationalDetails: applicantData.educationalDetails,
//       healthAndDisability: applicantData.healthAndDisability,
//       foodSafetyQuestionnaire: applicantData.foodSafetyQuestionnaire,
//       bankDetails: applicantData.bankDetails,
//       agreementConsent: applicantData.agreementConsent,
//       reference: applicantData.reference,
//     };

//     // Convert the data to CSV
//     const fields = Object.keys(combinedData);
//     const json2csvParser = new Parser({ fields });
//     const csv = json2csvParser.parse(combinedData);

//     // Set headers for file download
//     res.header('Content-Type', 'text/csv');
//     res.attachment(`applicant_${applicationNo}.csv`);
//     return res.send(csv);

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }

// New method for downloading applicant data as CSV
static async downloadApplicantDataCsv(req: Request, res: Response) {
  try {
    const { applicationNo } = req.params;
    const applicantData = await ApplicationService.getApplicantData(applicationNo);
    
    if (!applicantData) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    // Map applicant data into the CSV structure
    const csvData = {
      Title: applicantData.personalDetails?.title,
      Forename1: applicantData.user?.firstName,
      Forename2: applicantData.user?.middleName,
      Surname: applicantData.user?.lastName,
      PreferredName: applicantData.user?.firstName,
      Telephone: applicantData.contactDetails?.phone,
      Mobile: applicantData.contactDetails?.phone, // Assuming phone is used for both
      Email: applicantData.user?.email,
      Address: `${applicantData.contactDetails?.street}, ${applicantData.contactDetails?.town}, ${applicantData.contactDetails?.postcode}`,
      Country: applicantData.contactDetails?.country,
      Gender: applicantData.personalDetails?.gender,
      Birthday: applicantData.personalDetails?.dateOfBirth,
      PassportNumber: applicantData.personalDetails?.passportPhoto, // Assuming passport photo contains passport info
      NINumber: applicantData.personalDetails?.nationalInsuranceNumber,
      WorksNumber: '', // This field is not mapped in your data
      Department: '', // This field is not mapped in your data
      JobTitle: applicantData.professionalDetails?.[0]?.jobTitle,
      College: applicantData.educationalDetails?.[0]?.schoolName,
      DateStarted: applicantData.professionalDetails?.[0]?.startDate,
      DateLeft: applicantData.professionalDetails?.[0]?.endDate,
      Director: '', // This field is not mapped in your data
      DirectorStartDate: '', // This field is not mapped in your data
      DirectorEndDate: '', // This field is not mapped in your data
      AlternativeDirectorsNIC: '', // This field is not mapped in your data
      PrimaryNICOnly: '', // This field is not mapped in your data
      PayFrequency: '', // This field is not mapped in your data
      PayMethod: '', // This field is not mapped in your data
      DeliveryMethod: '', // This field is not mapped in your data
      BankName: applicantData.bankDetails?.bankName,
      BranchName: '', // This field is not mapped in your data
      SortCode: applicantData.bankDetails?.sortCode,
      AccountName: applicantData.bankDetails?.accountName,
      AccountNumber: applicantData.bankDetails?.accountNumber,
      PaymentReference: '', // This field is not mapped in your data
      BuildingSocietyReference: '', // This field is not mapped in your data
      BankTelephone: '', // This field is not mapped in your data
      BankAddress: '', // This field is not mapped in your data
      AEExcluded: '', // This field is not mapped in your data
      PostponedUntil: '', // This field is not mapped in your data
      AEPension: '', // This field is not mapped in your data
      AEJoined: '', // This field is not mapped in your data
      AEOptedIn: '', // This field is not mapped in your data
      AELeft: '', // This field is not mapped in your data
      AEOptedOut: '', // This field is not mapped in your data
      Group: '', // This field is not mapped in your data
      EmployeePercentage: '', // This field is not mapped in your data
      EmployerPercentage: '', // This field is not mapped in your data
      AVCPercentage: '' // This field is not mapped in your data
    };

    // Convert the data to CSV
    const fields = Object.keys(csvData);
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse([csvData]); // Wrap csvData in an array to avoid issue with a single row

    // Set headers for file download
    res.header('Content-Type', 'text/csv');
    res.attachment(`applicant_${applicationNo}.csv`);
    return res.send(csv);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// New method for downloading all applicants' data as CSV
static async downloadAllApplicantsCsv(req: Request, res: Response) {
  try {
    // Fetch all applicants from the service
    const allApplicants = await ApplicationService.getAllApplicantsData(); // Update to the correct method name

    if (!allApplicants || allApplicants.length === 0) {
      return res.status(404).json({ message: 'No applicants found' });
    }

    // Map all applicants' data into the CSV structure
    const csvData = allApplicants.map(applicant => {
      const { personalDetails, user, contactDetails, professionalDetails, educationalDetails, bankDetails } = applicant;
      
      return {
        Title: personalDetails?.title,
        Forename1: user?.firstName,
        Forename2: user?.middleName,
        Surname: user?.lastName,
        PreferredName: user?.firstName,
        Telephone: contactDetails?.phone,
        Mobile: contactDetails?.phone, // Assuming phone is used for both
        Email: user?.email,
        Address: `${contactDetails?.street}, ${contactDetails?.town}, ${contactDetails?.postcode}`,
        Country: contactDetails?.country,
        Gender: personalDetails?.gender,
        Birthday: personalDetails?.dateOfBirth,
        PassportNumber: personalDetails?.passportPhoto, // Assuming passport photo contains passport info
        NINumber: personalDetails?.nationalInsuranceNumber,
        WorksNumber: '', // Not mapped
        Department: '', // Not mapped
        JobTitle: professionalDetails?.[0]?.jobTitle,
        College: educationalDetails?.[0]?.schoolName,
        DateStarted: professionalDetails?.[0]?.startDate,
        DateLeft: professionalDetails?.[0]?.endDate,
        Director: '', // Not mapped
        DirectorStartDate: '', // Not mapped
        DirectorEndDate: '', // Not mapped
        AlternativeDirectorsNIC: '', // Not mapped
        PrimaryNICOnly: '', // Not mapped
        PayFrequency: '', // Not mapped
        PayMethod: '', // Not mapped
        DeliveryMethod: '', // Not mapped
        BankName: bankDetails?.bankName,
        BranchName: '', // Not mapped
        SortCode: bankDetails?.sortCode,
        AccountName: bankDetails?.accountName,
        AccountNumber: bankDetails?.accountNumber,
        PaymentReference: '', // Not mapped
        BuildingSocietyReference: '', // Not mapped
        BankTelephone: '', // Not mapped
        BankAddress: '', // Not mapped
        AEExcluded: '', // Not mapped
        PostponedUntil: '', // Not mapped
        AEPension: '', // Not mapped
        AEJoined: '', // Not mapped
        AEOptedIn: '', // Not mapped
        AELeft: '', // Not mapped
        AEOptedOut: '', // Not mapped
        Group: '', // Not mapped
        EmployeePercentage: '', // Not mapped
        EmployerPercentage: '', // Not mapped
        AVCPercentage: '' // Not mapped
      };
    });

    // Convert the data to CSV
    const fields = Object.keys(csvData[0]);
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData); // Parse all applicants' data into CSV

    // Set headers for file download
    res.header('Content-Type', 'text/csv');
    res.attachment('all_applicants.csv');
    return res.send(csv);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}




 // New method for downloading applicant data as PDF
 static async downloadApplicantDataPdf(req: Request, res: Response) {
  try {
    const { applicationNo } = req.params;
    const applicantData = await ApplicationService.getApplicantData(applicationNo);

    if (!applicantData) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    // Initialize PDF document
    const doc = new PDFDocument();
    
    // Set response headers for PDF download
    res.setHeader('Content-disposition', `attachment; filename="applicant_${applicationNo}.pdf"`);
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(18).text(`Applicant Data - ${applicationNo}`, { align: 'center' });
    doc.moveDown();

    // Add applicant data to PDF
    doc.fontSize(12).text(`Title: ${applicantData.personalDetails?.title || 'N/A'}`);
    doc.text(`Forename1: ${applicantData.user?.firstName || 'N/A'}`);
    doc.text(`Forename2: ${applicantData.user?.middleName || 'N/A'}`);
    doc.text(`Surname: ${applicantData.user?.lastName || 'N/A'}`);
    doc.text(`PreferredName: ${applicantData.user?.firstName || 'N/A'}`);
    doc.text(`Telephone: ${applicantData.contactDetails?.phone || 'N/A'}`);
    doc.text(`Mobile: ${applicantData.contactDetails?.phone || 'N/A'}`);
    doc.text(`Email: ${applicantData.user?.email || 'N/A'}`);
    doc.text(`Address: ${applicantData.contactDetails?.street || 'N/A'}, ${applicantData.contactDetails?.town || 'N/A'}, ${applicantData.contactDetails?.postcode || 'N/A'}`);
    doc.text(`Country: ${applicantData.contactDetails?.country || 'N/A'}`);
    doc.text(`Gender: ${applicantData.personalDetails?.gender || 'N/A'}`);
    doc.text(`Birthday: ${applicantData.personalDetails?.dateOfBirth || 'N/A'}`);
    doc.text(`PassportNumber: ${applicantData.personalDetails?.passportPhoto || 'N/A'}`);
    doc.text(`NINumber: ${applicantData.personalDetails?.nationalInsuranceNumber || 'N/A'}`);
    doc.text(`JobTitle: ${applicantData.professionalDetails?.[0]?.jobTitle || 'N/A'}`);
    doc.text(`College: ${applicantData.educationalDetails?.[0]?.schoolName || 'N/A'}`);
    doc.text(`DateStarted: ${applicantData.professionalDetails?.[0]?.startDate || 'N/A'}`);
    doc.text(`DateLeft: ${applicantData.professionalDetails?.[0]?.endDate || 'N/A'}`);
    doc.text(`BankName: ${applicantData.bankDetails?.bankName || 'N/A'}`);
    doc.text(`SortCode: ${applicantData.bankDetails?.sortCode || 'N/A'}`);
    doc.text(`AccountName: ${applicantData.bankDetails?.accountName || 'N/A'}`);
    doc.text(`AccountNumber: ${applicantData.bankDetails?.accountNumber || 'N/A'}`);

    // Finalize the PDF and end the stream
    doc.end();

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



  
}



