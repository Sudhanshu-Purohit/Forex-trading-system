import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter correct email" })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    readonly password: string;
}