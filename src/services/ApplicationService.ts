import { AppDataSource } from '../data-source';
import { User } from '../entities/UserEntity';
import { Application } from '../entities/ApplicationEntity';
import { PersonalDetails } from '../entities/PersonalDetailsEntity';
import { ContactDetails } from '../entities/ContactDetailsEntity';
import { ProfessionalDetails } from '../entities/ProfessionalDetailsEntity';
import { EducationalDetails } from '../entities/EducationalDetailsEntity';
import { HealthAndDisability } from '../entities/HealthAndDisabilityEntity';
import { FoodSafetyQuestionnaire } from '../entities/FoodSafetyQuestionnaireEntity';
import { BankDetails } from '../entities/BankDetailsEntity';
import { AgreementConsent } from '../entities/AgreementConsentEntity';
import { Reference } from '../entities/ReferenceEntity';

export class ApplicationService {
  static async createApplication(data: any) {
    // Implementation for creating an application
  }

  static async updateApplicationByNo(applicationNo: string, data: any) {
    // Implementation for updating an application by its number
  }

  static async deleteApplicationByNo(applicationNo: string) {
    // Implementation for deleting an application by its number
  }

  
  static async getApplicationByNo(applicationNo: string) {
    try {
      const application = await AppDataSource.getRepository(Application).findOneBy({ applicationNo });
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    } catch (error) {
      throw new Error(`Error retrieving application: ${error.message}`);
    }
  }

  static async getApplicantData(applicationNo: string) {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ applicationNo });
      const application = await AppDataSource.getRepository(Application).findOneBy({ applicationNo });
      const personalDetails = await AppDataSource.getRepository(PersonalDetails).findOneBy({ applicationNo });
      const contactDetails = await AppDataSource.getRepository(ContactDetails).findOneBy({ applicationNo });
      const professionalDetails = await AppDataSource.getRepository(ProfessionalDetails).findOneBy({ applicationNo });
      const educationalDetails = await AppDataSource.getRepository(EducationalDetails).findOneBy({ applicationNo });
      const healthAndDisability = await AppDataSource.getRepository(HealthAndDisability).findOneBy({ applicationNo });
      const foodSafetyQuestionnaire = await AppDataSource.getRepository(FoodSafetyQuestionnaire).findOneBy({ applicationNo });
      const bankDetails = await AppDataSource.getRepository(BankDetails).findOneBy({ applicationNo });
      const agreementConsent = await AppDataSource.getRepository(AgreementConsent).findOneBy({ applicationNo });
      const reference = await AppDataSource.getRepository(Reference).findOneBy({ applicationNo });

      return {
        user,
        application,
        personalDetails,
        contactDetails,
        professionalDetails,
        educationalDetails,
        healthAndDisability,
        foodSafetyQuestionnaire,
        bankDetails,
        agreementConsent,
        reference,
      };
    } catch (error) {
      throw new Error(`Error retrieving applicant data: ${error.message}`);
    }
  }

  static async getAllApplicants() {
    try {
      const applications = await AppDataSource.getRepository(Application).find();
      return applications;
    } catch (error) {
      throw new Error(`Error retrieving all applicants: ${error.message}`);
    }
  }
}
