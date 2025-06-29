import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Get()
    findAll() {
        return this.appointmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.appointmentService.findOne(id);
    }
}