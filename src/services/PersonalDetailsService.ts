import { PersonalDetails } from '../entities/PersonalDetailsEntity';
import { AppDataSource } from '../data-source';

const personalDetailsRepository = AppDataSource.getRepository(PersonalDetails);

export class PersonalDetailsService {
    // Create a new PersonalDetails entry
    static async create(data: any) {
        const entry = personalDetailsRepository.create(data);
        return await personalDetailsRepository.save(entry);
    }

    // Get all PersonalDetails entries
    static async getAll() {
        return await personalDetailsRepository.find();
    }

    // Get PersonalDetails entry by applicationNo
    static async getByApplicationNo(applicationNo: string) {
        return await personalDetailsRepository.findOneBy({ applicationNo });
    }

    // Update PersonalDetails entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        const entry = await this.getByApplicationNo(applicationNo);
        if (!entry) {
            throw new Error('Personal details not found');
        }
        Object.assign(entry, data);
        return await personalDetailsRepository.save(entry);
    }

    // Delete PersonalDetails entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        const result = await personalDetailsRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Personal details not found');
        }
        return 'Personal details deleted';
    }
}
