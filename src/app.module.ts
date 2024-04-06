import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { FxRatesModule } from './fx-rates/fx-rates.module';
import { FxConversionModule } from './fx-conversion/fx-conversion.module';

@Module({
  imports: [AccountsModule, FxRatesModule, FxConversionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
