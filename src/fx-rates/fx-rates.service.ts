import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FxRatesService {
    private rates = {};

    constructor(private httpService: HttpService) { }

    async fetchRates(): Promise<void> {
        try {
            const res = await this.httpService.axiosRef.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=SI7QK7Q0HFAD8E31')
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error( err?.message + ': ' + JSON.stringify(err?.response?.data));
                });

            this.rates = res;
        } catch (error) {
            console.error('Error fetching rates:', error.message);
        }
    }

    getRates() {
        return this.rates;
    }
}
