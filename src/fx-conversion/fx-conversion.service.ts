import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { FxConversionDto } from './dto/fx-conversion.dto';

@Injectable()
export class FxConversionService {
    constructor(private httpService: HttpService) { }

    async fxConversion(fxConversionDto: FxConversionDto): Promise<{ convertedAmount: number, currency: string }> {
        const { fromCurrency, toCurrency, amount } = fxConversionDto;
        try {
            const res = await this.httpService.axiosRef.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${process.env.ALPHADVANTAGE_API}`)
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error(err?.message + ': ' + JSON.stringify(err?.response?.data));
                });

            const exchangeRate = parseFloat(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);

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
