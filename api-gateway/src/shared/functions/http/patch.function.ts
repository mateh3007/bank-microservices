import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { handleError } from '../error/handle-error.function';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpPatchFunction {
  constructor(private readonly httpService: HttpService) {}

  async requestPatch(url: string, data: any) {
    try {
      const response = await lastValueFrom(this.httpService.patch(url, data));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}
