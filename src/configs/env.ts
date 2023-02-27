//Read .env and append env var for config service
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

enum ENVIRONMENT {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

class EnvironmentVariables {
  @IsEnum(ENVIRONMENT)
  NODE_ENV!: ENVIRONMENT;

  @IsString()
  EXCHANGE_URL!: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export const ENV_CONFIG = (): {
  isProd: boolean;
} => ({
  isProd: process.env.NODE_ENV === ENVIRONMENT.PRODUCTION,
});
