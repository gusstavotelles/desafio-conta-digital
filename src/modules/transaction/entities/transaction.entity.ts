export interface ITransaction {
  id: string;
  sender_document: string;
  receiver_document: string;
  value: number;
  date_time: string;
}

export class Transaction implements ITransaction {
  public id: string;
  public sender_document: string;
  public receiver_document: string;
  public value: number;
  public date_time: string;

  constructor(obj: ITransaction) {
    Object.entries(obj).forEach(([key, value]) =>
      Object.assign(this, { [key]: value }),
    );
  }
}
