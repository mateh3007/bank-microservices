import { CLIENT_URL } from 'src/shared/constants/client-url-constant';
import { HttpDeleteFunction } from 'src/shared/functions/http/delete.function';
import { HttpGetFunction } from 'src/shared/functions/http/get.function';
import { HttpPatchFunction } from 'src/shared/functions/http/patch.function';
import {
  GetBankAccountDetailsReturn,
  GetBankAccountByIdReturn,
} from '../../interfaces/bank-account.interface';
import { UpdateProfileParams } from '../../interfaces/profile.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUseCase {
  constructor(
    private readonly httpGetFunction: HttpGetFunction,
    private readonly httpPatchFunction: HttpPatchFunction,
    private readonly httpDeleteFunction: HttpDeleteFunction,
  ) {}

  async getProfile(id: string): Promise<GetBankAccountDetailsReturn> {
    return await this.httpGetFunction.requestGet(
      `${CLIENT_URL}/profiles/${id}`,
    );
  }

  async updateProfile(
    id: string,
    payload: UpdateProfileParams,
  ): Promise<GetBankAccountByIdReturn> {
    return await this.httpPatchFunction.requestPatch(
      `${CLIENT_URL}/profiles/update/${id}`,
      payload,
    );
  }

  async deleteProfile(id: string): Promise<void> {
    return await this.httpDeleteFunction.requestDelete(
      `${CLIENT_URL}/profiles/delete/${id}`,
    );
  }
}
