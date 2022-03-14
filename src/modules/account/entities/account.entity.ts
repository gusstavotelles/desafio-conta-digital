import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export interface IAccount {
  id: string;
  name: string;
  document: string;
  available_value: number;
}
@Entity()
export class Account implements IAccount {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  @Column()
  public name: string;
  @ApiProperty()
  @Column()
  public document: string;
  @ApiProperty()
  @Column()
  public available_value: number;

  constructor(obj: IAccount) {
    Object.entries(obj).forEach(([key, value]) =>
      Object.assign(this, { [key]: value }),
    );
  }
}
