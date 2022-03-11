import { Inject, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import * as moment from 'moment';

@Injectable()
export class TransactionService {
  constructor(
     private readonly accountService: AccountService,
  ) {}

  private transactions: Array<Transaction> = [];

  create(newTransaction: CreateTransactionDto) {
    const receiver = AccountService.accounts.find(
      (account) => account.document == newTransaction.receiver_document,
    );
    const sender = AccountService.accounts.find(
      (account) => account.document == newTransaction.sender_document,
    );

    if (receiver && sender) {
      if (newTransaction.value <= sender.available_value) {
        newTransaction.id = (this.transactions.length + 1).toString();
        newTransaction.date_time = moment().format();
        this.transactions.push(newTransaction);
        return newTransaction;
      } else {
        console.log(newTransaction.value +
          ' is higher than current available value ($' +
          sender.available_value )
        return (
          newTransaction.value +
          ' is higher than current available value ($' +
          sender.available_value +
          ').'
        );
      }
    } else {
      console.log('sender: '+sender)
      console.log('sender: ' + sender);
      return 'One or more account(s) are not in the system';
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
