import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class BankDetails {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;
    @Column({ unique: true })
    applicationNo: string;

    @Column()
    bankName: string;

    @Column()
    accountNumber: string;

    @Column()
    sortCode: string;

    @Column()
    accountName: string;

    @Column()
    employmentStatusDeclaration: string;
}
