import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('chefs')
export class Chef {
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

    @Column({ length: 50 })
    cuisineType: string;

    @Column({ type: 'text' })
    experience: string;

    @Column({ type: 'text', nullable: true })
    profilePicture: string;
    
    @Column({ type: 'text' })
    briefDescription: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
