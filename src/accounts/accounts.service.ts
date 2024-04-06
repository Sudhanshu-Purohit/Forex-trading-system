import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
    private balances: Record<string, number> = { USD: 0, EUR: 0, GBP: 0 };

    getBalances() {
        return this.balances;
    }

    topUpAccount(currency: string, amount: number) {
        if( amount <= 0) {
            throw new HttpException(`Amount must be a valid number greater than 0`, HttpStatus.BAD_REQUEST);
        }

        const supportedCurrencies = ["USD", "EUR", "GBP"];
        if (!supportedCurrencies.includes(currency)) {
            throw new HttpException(`Currency ${currency} is not supported`, HttpStatus.BAD_REQUEST);
        }

        this.balances[currency] += amount;
        return { message: "Account topped up successfully", balances: this.balances };
    }
}
