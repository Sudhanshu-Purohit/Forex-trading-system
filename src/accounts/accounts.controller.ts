import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Get('balance')
    @UseGuards(AuthGuard())
    getBalances() {
        return this.accountsService.getBalances();
    }

    @Post('topup')
    @UseGuards(AuthGuard())
    topUpAccount(@Body('currency') currency: string, @Body('amount') amount: number) {
        return this.accountsService.topUpAccount(currency, amount);
    }
}
