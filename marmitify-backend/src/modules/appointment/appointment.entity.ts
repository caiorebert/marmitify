import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../client/client.entity';
import { Chef } from '../chef/chef.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.id, { nullable: false })
    client: Client;

    @ManyToOne(() => Chef, (chef) => chef.id, { nullable: false })
    chef: Chef;

    @Column({ type: 'timestamp', nullable: false })
    dateTime: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}