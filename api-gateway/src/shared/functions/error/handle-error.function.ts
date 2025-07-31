import { HttpException } from '@nestjs/common';

export function handleError(error: any) {
  const message = error?.response?.data?.message || 'Internal error';
  const status = error?.response?.status || 500;
  throw new HttpException(message, status);
}
