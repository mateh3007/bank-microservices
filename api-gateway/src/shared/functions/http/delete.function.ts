import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { handleError } from '../error/handle-error.function';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpDeleteFunction {
  constructor(private readonly httpService: HttpService) {}

  async requestDelete(url: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.request({ method: 'DELETE', url }),
      );
      return response.data;
    } catch (error) {
      handleError(error);
      return error;
    }
  }
}
