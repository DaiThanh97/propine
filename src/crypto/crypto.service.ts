import * as path from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRow, ITransaction, TokenType } from './crypto.type';
import { csvToData } from '../utils/csv';
import { transformAmount } from '../utils/helper';
import { ExchangeService } from '../exchange/exchange.service';
import { Currency, TrackName } from '../common/enum';
import { formatDateString, isMatchDateFormat } from '../utils/date';
import { PUBLIC_PATH } from '../common/const';

@Injectable()
export class CryptoService {
  private pathToCsv: string;
  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly configService: ConfigService,
  ) {
    this.pathToCsv = path.join(
      process.cwd(),
      PUBLIC_PATH,
      this.configService.get<string>('CSV_FILE_NAME'),
    );
  }

  private async onCompleteExchange(
    map: Map<string, number>,
    trackName: string,
  ): Promise<void> {
    map = await this.exchangeService.exchangeCurrency(map, Currency.USD);
    console.log(`${trackName}: `, map);
  }

  async handleLatestPortfolioPerToken(): Promise<void> {
    let resultMap = new Map();
    csvToData(
      this.pathToCsv,
      (row: IRow<ITransaction>) => {
        const { data } = row;
        const { token, transaction_type, amount } = data;
        let value = 0;
        const hasToken = resultMap.has(token);
        if (hasToken) {
          const currentValue: number = resultMap.get(token);
          value = currentValue + transformAmount(transaction_type, amount);
        } else {
          value = amount;
        }
        resultMap.set(token, value);
      },
      () => this.onCompleteExchange(resultMap, TrackName.PortfolioPerToken),
    );
  }

  async handleLatestPortfolioByToken(tokenType: TokenType): Promise<void> {
    let resultMap = new Map();
    csvToData(
      this.pathToCsv,
      (row: IRow<ITransaction>) => {
        const { data } = row;
        const { token, transaction_type, amount } = data;
        if (token !== tokenType.toUpperCase()) {
          return;
        }

        let value = 0;
        const currentValue: number = resultMap.get(token) ?? 0;
        value = currentValue + transformAmount(transaction_type, amount);
        resultMap.set(token, value);
      },
      () => this.onCompleteExchange(resultMap, TrackName.PortfolioByToken),
    );
  }

  async handleLatestPortfolioPerDate(dateStr: string): Promise<void> {
    if (!isMatchDateFormat(dateStr)) {
      throw new BadRequestException('Date format is invalid!');
    }

    let resultMap = new Map();
    csvToData(
      this.pathToCsv,
      (row: IRow<ITransaction>) => {
        const { data } = row;
        const { token, transaction_type, amount, timestamp } = data;
        const date = new Date(timestamp);
        if (dateStr !== formatDateString(date)) {
          return;
        }

        let value = 0;
        const hasToken = resultMap.has(token);
        if (hasToken) {
          const currentValue: number = resultMap.get(token);
          value = currentValue + transformAmount(transaction_type, amount);
        } else {
          value = amount;
        }
        resultMap.set(token, value);
      },
      () => this.onCompleteExchange(resultMap, TrackName.PortfolioPerDate),
    );
  }

  async handleLatestPortfolioPerDateToken(
    dateStr: string,
    tokenType: TokenType,
  ): Promise<void> {
    if (!isMatchDateFormat(dateStr)) {
      throw new BadRequestException('Date format is invalid!');
    }

    let resultMap = new Map();
    csvToData(
      this.pathToCsv,
      (row: IRow<ITransaction>) => {
        const { data } = row;
        const { token, transaction_type, amount, timestamp } = data;
        const date = new Date(timestamp);

        if (
          dateStr !== formatDateString(date) ||
          token !== tokenType.toUpperCase()
        ) {
          return;
        }

        let value = 0;
        const currentValue: number = resultMap.get(token) ?? 0;
        value = currentValue + transformAmount(transaction_type, amount);
        resultMap.set(token, value);
      },
      () => this.onCompleteExchange(resultMap, TrackName.PortfolioPerDateToken),
    );
  }
}
