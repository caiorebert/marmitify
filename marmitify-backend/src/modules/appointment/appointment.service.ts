import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { Client } from '../client/client.entity';
import { Chef } from '../chef/chef.entity';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Chef)
        private readonly chefRepository: Repository<Chef>,
    ) {}

    async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        const client = await this.clientRepository.findOne({ where: { id: createAppointmentDto.clientId } });
        if (!client) {
            throw new NotFoundException(`Client com ID ${createAppointmentDto.clientId} não encontrado`);
        }

        const chef = await this.chefRepository.findOne({ where: { id: createAppointmentDto.chefId } });
        if (!chef) {
            throw new NotFoundException(`Chef com ID ${createAppointmentDto.chefId} não encontrado`);
        }

        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            client,
            chef,
        });

        return await this.appointmentRepository.save(appointment);
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointmentRepository.find({ relations: ['client', 'chef'] });
    }

    async findOne(id: number): Promise<Appointment> {
        const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['client', 'chef'] });
        if (!appointment) {
            throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
        }
        return appointment;
    }
}