import { Module } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { CommandProvider } from './command.provider';

@Module({
  imports: [CryptoModule],
  providers: [CommandProvider],
})
export class CommandModule {}
