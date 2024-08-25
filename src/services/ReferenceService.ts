import { AppDataSource } from '../data-source';
import { Reference } from '../entities/ReferenceEntity';

const referenceRepository = AppDataSource.getRepository(Reference);

export class ReferenceService {
    // Create or update Reference
    static async createOrUpdate(data: Partial<Reference>): Promise<Reference> {
        const { applicationNo } = data;
        let reference = await referenceRepository.findOneBy({ applicationNo });

        if (reference) {
            // Update existing reference
            Object.assign(reference, data);
            return await referenceRepository.save(reference);
        } else {
            // Create new reference
            reference = referenceRepository.create(data);
            return await referenceRepository.save(reference);
        }
    }

    // Get Reference by applicationNo
    static async getByApplicationNo(applicationNo: string): Promise<Reference | null> {
        return await referenceRepository.findOneBy({ applicationNo });
    }

    // Update Reference by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: Partial<Reference>): Promise<Reference | null> {
        let reference = await this.getByApplicationNo(applicationNo);
        if (!reference) {
            throw new Error('Reference not found');
        }
        Object.assign(reference, data);
        return await referenceRepository.save(reference);
    }

    // Delete Reference by applicationNo
    static async deleteByApplicationNo(applicationNo: string): Promise<string> {
        const result = await referenceRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Reference not found');
        }
        return 'Reference deleted';
    }
}
