import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountSchema } from './schemas/accounts.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Account', schema: AccountSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [MongooseModule],
})
export class AccountsModule {}
