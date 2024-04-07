import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopUpDto } from './dto/top-up.dto';
import { Account } from './schemas/accounts.schema';
import { User } from 'src/auth/schemas/user.schema';
import { GetBalanceDto } from './dto/get-balance.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }


    async getBalances(getBalanceDto: GetBalanceDto): Promise<{ balances: { "USD": number, "EUR": number, "GBP": number } }> {
        const { userId } = getBalanceDto;

        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
            }

            const account = await this.accountModel.findOne({ userId });
            if (!account) {
                throw new HttpException(`Account not found please topup`, HttpStatus.NOT_FOUND);
            }
            const { balances } = account;

            return { balances };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async topUpAccount(topUpDto: TopUpDto, userId: string): Promise<{ message: string }> {
        const { currency, amount } = topUpDto;

        try {
            const user = await this.userModel.findById({ _id: userId });
            if (!user) {
                throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
            }

            const update = {
                $inc: { [`balances.${currency}`]: amount }
            };

            const options = {
                upsert: true,
                new: true
            };

            await this.accountModel.findOneAndUpdate(
                { userId },
                update,
                options
            );

            return { message: "Account topped up successfully" };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
