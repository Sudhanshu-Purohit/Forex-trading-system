import { Body, Controller, Post } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionDto } from './dto/fx-conversion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('fx-conversion')
@ApiTags('Fx-Conversion')
export class FxConversionController {
    constructor(private readonly fxConversionService: FxConversionService) { }
    @Post()
    async fxConversion(@Body() fxConversionDto: FxConversionDto): Promise<{convertedAmount: number, currency: string}> {;
        return this.fxConversionService.fxConversion(fxConversionDto);
    }
}
