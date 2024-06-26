import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string, token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ message: string, token: string }> {
        return this.authService.login(loginDto);
    }
}
