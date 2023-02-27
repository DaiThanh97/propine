import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpStatusCode } from 'axios';
import { Currency } from '../common/enum';
import { IExchangeRate } from './exchange.interface';

@Injectable()
export class ExchangeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async getExchangeRate(currency: Currency): Promise<number> {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.configService.get<string>('EXCHANGE_URL')}${currency}`,
      );
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Something went wrong when fetching USD change rate!');
      }
      const data = response.data as IExchangeRate;
      return data[currency];
    } catch (err) {
      console.error('getExchangeRateUSD: ', err);
      throw err;
    }
  }

  async exchangeCurrency(
    map: Map<string, number>,
    currency: Currency,
  ): Promise<Map<string, number>> {
    const rate = await this.getExchangeRate(currency);
    for (const [key, value] of map.entries()) {
      const exchangeValue = value * rate;
      map.set(key, exchangeValue);
    }
    return map;
  }
}
