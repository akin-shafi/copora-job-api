import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class ContactDetails {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;
    @Column({ unique: true })
    applicationNo: string;

    @Column()
    phone: string;

    @Column()
    address_line_1: string;

    @Column()
    address_line_2: string;

    @Column()
    country: string;

    @Column()
    town: string;

    @Column()
    postcode: string;

    @Column()
    linkedin: string;

    @Column()
    twitter: string;
}
