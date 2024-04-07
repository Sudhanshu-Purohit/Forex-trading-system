import { Module } from '@nestjs/common';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FxRatesController],
  providers: [FxRatesService]
})
export class FxRatesModule {}
