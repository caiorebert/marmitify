import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateChefDto {
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

    @IsString()
    @IsOptional()
    @MaxLength(50)
    cuisineType?: string;

    @IsString()
    @IsOptional()
    experience?: string;

    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsOptional()
    briefDescription?: string;
    
    constructor(partial: Partial<UpdateChefDto>) {
        Object.assign(this, partial);
    }
}