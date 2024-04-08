import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { FxConversionDto } from './dto/fx-conversion.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FxConversionService {
    constructor(
        private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async fxConversion(fxConversionDto: FxConversionDto): Promise<{ convertedAmount: number, currency: string }> {
        const { fromCurrency, toCurrency, amount } = fxConversionDto;
        const cacheKey = `${fromCurrency}_${toCurrency}`;

        try {
            let exchangeRate: number = await this.cacheManager.get(cacheKey);
            if (!exchangeRate) {
                const res = await this.httpService.axiosRef.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${process.env.ALPHADVANTAGE_API}`)
                    .then((res) => res.data)
                    .catch((err) => {
                        throw new Error(err?.message + ': ' + JSON.stringify(err?.response?.data));
                    });

                exchangeRate = parseFloat(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);

                // Cache exchange rate for 30 seconds
                await this.cacheManager.set(cacheKey, exchangeRate, 30000);
            }

            const convertedAmount = parseFloat((amount * exchangeRate).toFixed(2));

            return {
                convertedAmount,
                currency: toCurrency
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
