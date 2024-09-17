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

    @Column({nullable: true })
    relationship: string;

    @Column({nullable: true })
    address: string;

    @Column()
    email: string;

    @Column({nullable: true })
    phone: string;
}
