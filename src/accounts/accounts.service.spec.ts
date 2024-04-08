import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountsService } from './accounts.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { TopUpDto } from './dto/top-up.dto';
import { Account } from './schemas/accounts.schema';

describe('AccountsService', () => {
    let service: AccountsService;
    let model: Model<Account>;

    const mockUser: Account = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        balances: {
            USD: 1000,
            EUR: 2000,
            GBP: 3000,
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountsService,
                {
                    provide: getModelToken(Account.name),
                    useValue: {
                        findById: jest.fn().mockResolvedValue(mockUser),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AccountsService>(AccountsService);
        model = module.get<Model<Account>>(getModelToken(Account.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getBalances', () => {
        it('should return user balances', async () => {
            const getBalanceDto: GetBalanceDto = {
                userId: '1234567890',
            };
            const result = await service.getBalances(getBalanceDto);
            expect(result.balances).toEqual(mockUser.balances);
        });

        it('should throw an error if user is not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
            const getBalanceDto: GetBalanceDto = {
                userId: 'invalid',
            };
            await expect(service.getBalances(getBalanceDto)).rejects.toThrow(
                HttpException,
            );
        });
    });

    describe('topUpAccount', () => {
        it('should top up account balance', async () => {
            const topUpDto: TopUpDto = {
                currency: 'USD',
                amount: 500,
            };
            const userId = '1234567890';
            const mockSave = jest.fn();
            jest.spyOn(model, 'findById').mockResolvedValueOnce({
                ...mockUser,
                save: mockSave,
            });

            const result = await service.topUpAccount(topUpDto, userId);
            expect(result.message).toBe('Account topped up successfully');
            expect(model.findById).toHaveBeenCalledWith({ _id: userId });
            expect(mockUser.balances.USD).toBe(1500);
            expect(mockSave).toHaveBeenCalled();
        });

        it('should throw an error if user is not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
            const topUpDto: TopUpDto = {
                currency: 'USD',
                amount: 500,
            };
            const userId = 'invalid';
            await expect(service.topUpAccount(topUpDto, userId)).rejects.toThrow(
                HttpException,
            );
        });
    });
});