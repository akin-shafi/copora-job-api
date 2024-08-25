import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EducationalDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    schoolName: string;

    @Column()
    certificateObtained: string;

    @Column()
    courseOfStudy: string;

    @Column()
    yearAdmitted: number;

    @Column()
    yearGraduated: number;
}
