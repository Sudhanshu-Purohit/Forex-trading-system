import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TopUpDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsIn(["USD", "EUR", "GBP"], { message: 'Currency must be one of USD, EUR, or GBP' })
  currency: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;
}

