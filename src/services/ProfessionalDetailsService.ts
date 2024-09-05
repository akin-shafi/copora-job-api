import { ProfessionalDetails } from '../entities/ProfessionalDetailsEntity';
import { AppDataSource } from '../data-source';

const professionalDetailsRepository = AppDataSource.getRepository(ProfessionalDetails);

export class ProfessionalDetailsService {
    // Create a new ProfessionalDetails Service entry
    static async create(data: any) {
        const entry = professionalDetailsRepository.create(data);
        return await professionalDetailsRepository.save(entry);
    }

    // Get all ProfessionalDetails entries
    static async getAll() {
        return await professionalDetailsRepository.find();
    }

    // Get ProfessionalDetails entry by applicationNo
    static async getByApplicationNo(applicationNo: string) {
        return await professionalDetailsRepository.findOneBy({ applicationNo });
    }

    // Update ProfessionalDetails entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        const entry = await this.getByApplicationNo(applicationNo);
        if (!entry) {
            throw new Error('Professional details not found');
        }
        Object.assign(entry, data);
        return await professionalDetailsRepository.save(entry);
    }

    // Delete ProfessionalDetails entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        const result = await professionalDetailsRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Professional details not found');
        }
        return 'Professional details deleted';
    }
}
