import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionDto } from './dto/fx-conversion.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException } from '@nestjs/common';

describe('FxConversionService', () => {
  let service: FxConversionService;
  let httpService: HttpService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FxConversionService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(),
            },
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FxConversionService>(FxConversionService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fxConversion', () => {
    it('should return converted amount and currency', async () => {
      const fxConversionDto: FxConversionDto = {
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100,
      };
      const exchangeRate = 0.85;
      const cacheKey = `${fxConversionDto.fromCurrency}_${fxConversionDto.toCurrency}`;

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValue({
        data: {
          'Realtime Currency Exchange Rate': {
            '5. Exchange Rate': exchangeRate.toString(),
          },
        },
      });
      jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined);

      const result = await service.fxConversion(fxConversionDto);

      expect(result).toEqual({
        convertedAmount: 85, 
        currency: 'EUR',
      });
      expect(cacheManager.set).toHaveBeenCalledWith(cacheKey, exchangeRate, 30000);
    });

    it('should throw an HttpException if the external API call fails', async () => {
      const fxConversionDto: FxConversionDto = {
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100,
      };

      jest.spyOn(httpService.axiosRef, 'get').mockRejectedValue(new Error('API call failed'));

      await expect(service.fxConversion(fxConversionDto)).rejects.toThrow(HttpException);
    });
  });
});
