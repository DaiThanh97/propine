import { Module } from '@nestjs/common';
import { ExchangeModule } from '../exchange/exchange.module';
import { CryptoService } from './crypto.service';

@Module({
  imports: [ExchangeModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
