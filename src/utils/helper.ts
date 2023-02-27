import { TransactionType } from '../crypto/crypto.type';

export const transformAmount = (
  transactionType: TransactionType,
  amount: number,
): number => {
  return transactionType === TransactionType.DEPOSIT ? amount : -amount;
};
