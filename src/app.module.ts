import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandProvider } from './command/command.provider';
import { ENV_CONFIG, validate } from './configs/env';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ENV_CONFIG],
      isGlobal: true,
      cache: true,
      validate,
    }),
    CryptoModule,
  ],
  providers: [CommandProvider],
})
export class AppModule {}
