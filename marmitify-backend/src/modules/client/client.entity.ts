import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ length: 15, nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ length: 100 })
    fullName: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ length: 100, nullable: true })
    foodPreference: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
