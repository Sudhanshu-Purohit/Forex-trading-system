import { Module } from '@nestjs/common';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FxConversionController],
  providers: [FxConversionService]
})
export class FxConversionModule {}
