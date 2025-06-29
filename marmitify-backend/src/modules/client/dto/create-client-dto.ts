import { IsString, IsOptional, IsNotEmpty, IsBoolean, MaxLength, IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsOptional()
    @MaxLength(15)
    phone: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(200)
    address?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    foodPreference?: string;
    
    constructor(partial: Partial<CreateClientDto>) {
        Object.assign(this, partial);
    }
}