import { Module } from '@nestjs/common';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';

@Module({
  controllers: [FxConversionController],
  providers: [FxConversionService]
})
export class FxConversionModule {}
