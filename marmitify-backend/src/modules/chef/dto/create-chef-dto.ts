import { IsString, IsOptional, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class CreateChefDto {
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

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    cuisineType: string;

    @IsString()
    @IsNotEmpty()
    experience: string;

    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsNotEmpty()
    briefDescription: string;
    
    constructor(partial: Partial<CreateChefDto>) {
        Object.assign(this, partial);
    }
}