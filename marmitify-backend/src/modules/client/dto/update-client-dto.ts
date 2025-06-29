import { IsString, IsOptional, MaxLength, IsEmail, IsBoolean } from 'class-validator';

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    @MaxLength(15)
    phone?: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    fullName?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    address?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    foodPreference?: string;

    constructor(partial: Partial<UpdateClientDto>) {
        Object.assign(this, partial);
    }
}