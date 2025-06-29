import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
    @IsNotEmpty()
    clientId: number;

    @IsNotEmpty()
    chefId: number;

    @IsDate()
    @IsNotEmpty()
    dateTime: Date;

    @IsString()
    @IsOptional()
    notes?: string;
}