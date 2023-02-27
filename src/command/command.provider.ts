import { Command, CommandRunner, Option } from 'nest-commander';
import { TokenType } from '../crypto/crypto.type';
import { CryptoService } from '../crypto/crypto.service';
import { IBasicCommandOptions } from './command.interface';

@Command({
  name: 'crypto',
  description: 'Crypto transaction period',
  options: { isDefault: true },
})
export class CommandProvider extends CommandRunner {
  constructor(private readonly cryptoService: CryptoService) {
    super();
  }

  async run(inputs: string[], options?: IBasicCommandOptions): Promise<void> {
    try {
      if (options?.token && options.date) {
        // TODO: Return the portfolio value of that token in USD on that date
        const { date, token } = options;
        await this.cryptoService.handleLatestPortfolioPerDateToken(
          date,
          token as TokenType,
        );
      } else if (options?.token) {
        const token = options.token as TokenType;
        // TODO: Return the latest portfolio value for specific token in USD
        await this.cryptoService.handleLatestPortfolioByToken(token);
      } else if (options?.date) {
        // TODO: Return the latest portfolio value per token in USD in specific date
        await this.cryptoService.handleLatestPortfolioPerDate(options.date);
      } else {
        // TODO: Return the latest portfolio value per token in USD
        await this.cryptoService.handleLatestPortfolioPerToken();
      }
    } catch (err) {
      console.error(err.response);
    }
  }

  @Option({
    flags: '-t, --token [string]',
    description: 'A token input',
  })
  handleTokenParam(token: string) {
    return token;
  }

  @Option({
    flags: '-d, --date [ddMMyyyy]',
    description: 'A date input with format [ddMMyyyy]',
  })
  handleDateParam(date: string) {
    return date;
  }
}
