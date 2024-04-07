import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class FxConversionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fromCurrency: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  toCurrency: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Amount must be a positive number' })
  @ApiProperty()
  amount: number;
}

