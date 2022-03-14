import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export interface ITransaction {
  id: string;
  sender_document: string;
  receiver_document: string;
  value: number;
  date_time: string;
}

@Entity()
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column()
  public sender_document: string;
  @Column()
  public receiver_document: string;
  @Column()
  public value: number;
  @Column()
  public date_time: string;

  constructor(obj: ITransaction) {
    Object.entries(obj).forEach(([key, value]) =>
      Object.assign(this, { [key]: value }),
    );
  }
}
