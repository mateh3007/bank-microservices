import { plainToInstance } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

export enum EnvTypes {
  DEV,
  STG,
  PRD,
}

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsEnum(EnvTypes)
  NODE_ENV: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
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
