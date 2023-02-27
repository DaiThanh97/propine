export interface IRow<T> {
  data: T;
  errors: Error[];
  meta: object;
}

export interface ITransaction {
  token: TokenType;
  amount: number;
  transaction_type: TransactionType;
  timestamp: string;
}

export enum TokenType {
  BTC = 'BTC',
  ETH = 'ETH',
  XRP = 'XRP',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}
