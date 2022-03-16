import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import * as moment from 'moment';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly accountService: AccountService,
  ) {}

  private transactions: Array<Transaction> = [];

  async create(newTransaction: CreateTransactionDto) {
    const receiver = await this.accountService.findOne(
      newTransaction.receiver_document,
    );
    const sender = await this.accountService.findOne(
      newTransaction.sender_document,
    );

    if (receiver && sender) {
      if (newTransaction.value <= sender.available_value) {
        newTransaction.id = (this.transactions.length + 1).toString();
        newTransaction.date_time = moment().format();

        this.transactionRepository.save(newTransaction);
        return newTransaction;
      } else {
        console.log(
          newTransaction.value +
            ' is higher than current available value ($' +
            sender.available_value,
        );
        return (
          newTransaction.value +
          ' is higher than current available value ($' +
          sender.available_value +
          ').'
        );
      }
    } else {
      console.log('sender: ' + sender);
      console.log('sender: ' + sender);
      return 'One or more account(s) are not in the system';
    }
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(sender_document: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { email: 'this@mailisnotindatabase.de' },
    });
    return this.transactionRepository.findOne(sender_document);
  }
}
