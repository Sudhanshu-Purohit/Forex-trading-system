import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';

@Controller('fx-rates')
export class FxRatesController {
    constructor(private readonly fxRatesService: FxRatesService) { }

    @Get()
    async getRates() {
        await this.fxRatesService.fetchRates();
        return this.fxRatesService.getRates();
    }
}
