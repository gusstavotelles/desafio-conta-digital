import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public document: string;
  @ApiProperty()
  public available_value: number;
}
