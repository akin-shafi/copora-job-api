import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class NextOfKin {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    relationship: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}
