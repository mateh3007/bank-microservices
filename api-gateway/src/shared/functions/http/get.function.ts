import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { handleError } from '../error/handle-error.function';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpGetFunction {
  constructor(private readonly httpService: HttpService) {}

  async requestGet(url: string) {
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}
