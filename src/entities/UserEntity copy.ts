import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    otp: string;

    @Column({ default: false })
    isActive: boolean;

    @OneToOne(() => Application)
    @JoinColumn()
    applicationNo: Application;

    // Add this role field
    @Column({ type: 'enum', enum: ['Admin', 'Employer', 'Applicant'], default: 'Applicant' })
    role: string;
}
