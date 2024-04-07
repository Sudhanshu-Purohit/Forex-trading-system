import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetBalanceDto } from './dto/get-balance.dto';
import { TopUpDto } from './dto/top-up.dto';
import { Account } from './schemas/accounts.schema';

@Injectable()
export class AccountsService {
    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>,
    ) { }


    async getBalances(getBalanceDto: GetBalanceDto): Promise<{ balances: { "USD": number, "EUR": number, "GBP": number } }> {
        const { userId } = getBalanceDto;

        try {
            const user = await this.accountModel.findById({ _id: userId });
            if (!user) {
                throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
            }

            const balances = user.balances;

            return { balances };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async topUpAccount(topUpDto: TopUpDto, userId: string): Promise<{ message: string }> {
        const { currency, amount } = topUpDto;

        try {
            const user = await this.accountModel.findById({ _id: userId });
            if (!user) {
                throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
            }

            user.balances[currency] += amount;
            await user.save();

            return { message: "Account topped up successfully" };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
