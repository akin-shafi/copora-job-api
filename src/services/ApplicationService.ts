import { AppDataSource } from '../data-source';
import { Application } from '../entities/ApplicationEntity';

export class ApplicationService {
    
    
    private applicationRepository = AppDataSource.getRepository(Application);
  static createApplication: any;

    async createApplication(): Promise<Application> {
        const application = new Application();
        application.applicationNo = this.generateUniqueApplicationNo();
        application.createdAt = new Date();
        application.updatedAt = new Date();
        
        await this.applicationRepository.save(application);
        return application;
    }

    private generateUniqueApplicationNo(): string {
        // Implement your logic to generate a unique application number
        // For example, you could use a UUID or a timestamp-based approach
        return `APP-${Date.now()}`;
    }

    static getApplicationByNo(applicationNo: string) {
        throw new Error('Method not implemented.');
    }
    static updateApplicationByNo(applicationNo: string, body: any) {
        throw new Error('Method not implemented.');
    }
    static deleteApplicationByNo(applicationNo: string) {
        throw new Error('Method not implemented.');
    }
}
