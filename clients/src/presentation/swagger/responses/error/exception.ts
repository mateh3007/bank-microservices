import { ExceptionParams } from '@domain/adapters/exception.adapter';
import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponseDto implements ExceptionParams {
  @ApiProperty({
    example: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: '400',
  })
  statusCode: number;
}
