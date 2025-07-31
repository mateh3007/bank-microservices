import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { handleError } from '../error/handle-error.function';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpPostFunction {
  constructor(private readonly httpService: HttpService) {}

  async requestPost(url: string, data: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(url, data));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}
