import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Account } from 'src/accounts/schemas/accounts.schema';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ message: string, token: string }> {
        const { name, email, password } = signUpDto;
        
        try {
            // checking if the user already exists
            const existingUser = await this.accountModel.findOne({ email });
            if (existingUser) {
                throw new HttpException('User already exists please login', HttpStatus.BAD_REQUEST);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.accountModel.create({
                name,
                email,
                password: hashedPassword
            })

            const token = this.jwtService.sign({ id: user._id });
            return { message: "Sign up successful", token };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async login(loginDto: LoginDto): Promise<{ message: string, token: string }> {
        const { email, password } = loginDto;

        try {
            const user = await this.accountModel.findOne({ email });
            if (!user) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const token = this.jwtService.sign({ id: user._id });
            return { message: "Login successful", token };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
