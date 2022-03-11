import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {

  public id: string;
  @ApiProperty()
  public sender_document: string;
  @ApiProperty()
  public receiver_document: string;
  @ApiProperty()
  public value: number;
  public date_time: string;
}
