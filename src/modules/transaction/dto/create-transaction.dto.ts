import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: number;
}
