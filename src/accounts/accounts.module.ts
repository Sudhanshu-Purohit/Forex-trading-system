import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountSchema } from './schemas/accounts.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Account', schema: AccountSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
