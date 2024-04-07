import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter a valid email address' })
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    readonly password: string;
}
