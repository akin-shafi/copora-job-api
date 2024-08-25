import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    employerName: string;

    @Column()
    contactName: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;
}
