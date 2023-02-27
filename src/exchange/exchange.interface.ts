import { Currency } from '../common/enum';

export interface IExchangeRate {
  [Currency.USD]?: number;
  [Currency.JPY]?: number;
  [Currency.EUR]?: number;
}
