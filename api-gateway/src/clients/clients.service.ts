import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientsService {
  private readonly clientsBaseUrl = 'http://microservice-clients:3010/api/v1';

  constructor(private readonly httpService: HttpService) {}

  async login({ email, password }: { email: string; password: string }) {
    return await this.requestPost(`${this.clientsBaseUrl}/auth/login`, {
      email,
      password,
    });
  }

  async createBankAccount(payload: any) {
    return await this.requestPost(
      `${this.clientsBaseUrl}/bank-accounts/create`,
      payload,
    );
  }

  async getBankDetails(id: string) {
    return this.requestGet(
      `${this.clientsBaseUrl}/bank-accounts/bank-details/${id}`,
    );
  }

  async getBankAccount(id: string) {
    return this.requestGet(`${this.clientsBaseUrl}/bank-accounts/${id}`);
  }

  async verifyBankAccountExists(id: string) {
    return this.requestGet(
      `${this.clientsBaseUrl}/bank-accounts/verify-exists/${id}`,
    );
  }

  async updateProfile(payload: any) {
    return this.requestPatch(`${this.clientsBaseUrl}/profile/update`, payload);
  }

  async deleteProfile(payload: any) {
    return this.requestDelete(
      `${this.clientsBaseUrl}/profiles/delete`,
      payload,
    );
  }

  async getProfileById(id: string) {
    return this.requestGet(`${this.clientsBaseUrl}/profile/${id}`);
  }

  private async requestGet(url: string) {
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async requestPost(url: string, data: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(url, data));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async requestPatch(url: string, data: any) {
    try {
      const response = await lastValueFrom(this.httpService.patch(url, data));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async requestDelete(url: string, data: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.request({ method: 'DELETE', url, data }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return error;
    }
  }

  private handleError(error: any) {
    const message = error?.response?.data?.message || 'Internal error';
    const status = error?.response?.status || 500;
    throw new HttpException(message, status);
  }
}
