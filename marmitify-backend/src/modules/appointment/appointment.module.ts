import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Client } from '../client/client.entity';
import { Chef } from '../chef/chef.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment, Client, Chef])],
    controllers: [AppointmentController],
    providers: [AppointmentService],
    exports: [AppointmentService],
})
export class AppointmentModule {}