import { EducationalDetails } from '../entities/EducationalDetailsEntity';
import { AppDataSource } from '../data-source';

export class EducationalDetailsService {
    private educationalDetailsRepository = AppDataSource.getRepository(EducationalDetails);

    // Create new EducationalDetails
    async createEducationalDetails(data: Partial<EducationalDetails>): Promise<EducationalDetails> {
        const educationalDetails = this.educationalDetailsRepository.create(data);
        return await this.educationalDetailsRepository.save(educationalDetails);
    }

    // Get EducationalDetails by applicationNo
    async getEducationalDetailsByApplicationNo(applicationNo: string): Promise<EducationalDetails | null> {
        return await this.educationalDetailsRepository.findOneBy({ applicationNo });
    }

    // Update EducationalDetails by applicationNo
    async updateEducationalDetailsByApplicationNo(applicationNo: string, data: Partial<EducationalDetails>): Promise<EducationalDetails | null> {
        await this.educationalDetailsRepository.update({ applicationNo }, data);
        return await this.educationalDetailsRepository.findOneBy({ applicationNo });
    }

    // Delete EducationalDetails by applicationNo
    async deleteEducationalDetailsByApplicationNo(applicationNo: string): Promise<string> {
        const result = await this.educationalDetailsRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Educational Details not found');
        }
        return 'Educational Details deleted';
    }
}
