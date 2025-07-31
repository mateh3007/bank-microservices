import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Client = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const client = request.user;
    return data ? client?.[data] : client;
  },
);
