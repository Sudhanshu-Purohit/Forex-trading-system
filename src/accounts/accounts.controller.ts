import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TopUpDto } from './dto/top-up.dto';
import { GetBalanceDto } from './dto/get-balance.dto';

@ApiTags('Accounts')
@ApiSecurity("JWT-auth")
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Get('balance')
    @UseGuards(AuthGuard())
    async getBalances(@Query() getBalanceDto: GetBalanceDto): Promise<{ balances: { "USD": number, "EUR": number, "GBP": number }}> {
        return this.accountsService.getBalances(getBalanceDto);
    }

    @Post('topup')
    @UseGuards(AuthGuard())
    async topUpAccount(@Body() topUpDto: TopUpDto, @Query('userId') userId: string): Promise<{message: string}> {
        return this.accountsService.topUpAccount(topUpDto, userId);
    }
}
