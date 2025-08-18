import { TokenAdapter } from '@domain/adapters/token';
import { Injectable } from '@nestjs/common';
import { ValidateClientUseCase } from '../validate-client';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { ClientRepository } from '@domain/repositories/client.repository';
import * as bcrypt from 'bcrypt';

export interface LoginUseCaseParams {
  email: string;
  password: string;
}

export type LoginUseCaseReturn = Promise<{ accessToken: string } | void>;

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly tokenService: TokenAdapter,
    private readonly exceptionsAdapter: ExceptionsAdapter,
    private readonly validateClientUseCase: ValidateClientUseCase,
  ) {}

  async login(payload: LoginUseCaseParams): LoginUseCaseReturn {
    const clientExists = await this.clientRepository.getByEmailToLogin(
      payload.email,
    );
    if (!clientExists) {
      return this.exceptionsAdapter.wrongCredentials();
    }

    const isValidClient =
      await this.validateClientUseCase.validate(clientExists);
    if (!isValidClient) return;

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      clientExists.password,
    );
    if (!isPasswordValid) {
      return this.exceptionsAdapter.wrongCredentials();
    }

    const accessToken = await this.tokenService.generateToken({
      id: clientExists.id,
    });

    return {
      accessToken,
    };
  }
}
