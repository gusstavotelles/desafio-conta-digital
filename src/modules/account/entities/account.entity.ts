import { ApiProperty } from "@nestjs/swagger";

export interface IAccount {
  id: string;
  name: string;
  document: string;
  available_value: number;
}

export class Account implements IAccount {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public document: string;
  @ApiProperty()
  public available_value: number;

  constructor(obj: IAccount) {
    Object.entries(obj).forEach(([key, value]) =>
      Object.assign(this, { [key]: value }),
    );
  }
}
