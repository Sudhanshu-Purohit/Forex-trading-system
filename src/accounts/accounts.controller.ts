import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Get('balance')
    getBalances() {
        return this.accountsService.getBalances();
    }

    @Post('topup')
    topUpAccount(@Body('currency') currency: string, @Body('amount') amount: number) {
        return this.accountsService.topUpAccount(currency, amount);
    }
}
