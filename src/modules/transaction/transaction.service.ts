import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import * as moment from 'moment';
import { TransactionRepository } from './transaction.repository';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService,
  ) {}

  private noAccountMessage =
    'Conta não inicializada: não existe uma conta associada ao documento presente na operação';

  async create(newTransaction: CreateTransactionDto) {
    const sender = await this.accountService.findOne(
      newTransaction.sender_document,
    );
    if (!sender) throw new NotFoundException(this.noAccountMessage);

    const receiver = await this.accountService.findOne(
      newTransaction.receiver_document,
    );
    if (!receiver) new NotFoundException(this.noAccountMessage);

    if (newTransaction.value > sender.available_value)
      throw new HttpException(
        newTransaction.value +
          ' is higher than current available value ($' +
          sender.available_value +
          ').',
        HttpStatus.BAD_REQUEST,
      );

    newTransaction.date_time = moment().format();
    const isDuplicate = await this.checkDuplicate(newTransaction);
    if (isDuplicate) {
      throw new HttpException(
        {
          sender: sender,
          receiver: receiver,
          transaction: newTransaction,
          message: 'Duplicate Operation, try again in 2 minutes.',
        },
        HttpStatus.CONFLICT,
      );
    }
    try {
      const result = await this.transactionRepository.create(newTransaction);
      if (!result) {
        throw new HttpException(
          'Failed Operation',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        return this.updateAccountsValue(result, sender, receiver);
      }
    } catch (err) {
      return err;
    }
  }

  async findByAccount(document: string) {
    return this.transactionRepository.findByAccount(document);
  }

  private async updateAccountsValue(
    transaction: any,
    sender: Account,
    receiver: Account,
  ) {
    sender.available_value -= transaction.value;
    await this.accountRepository.insertUpdate(sender);

    receiver.available_value += transaction.value;
    await this.accountRepository.insertUpdate(receiver);
    transaction.available_value = sender.available_value;
    return transaction;
  }

  private async checkDuplicate(
    transaction: CreateTransactionDto,
  ): Promise<boolean> {
    const trans = await this.transactionRepository.findBySenderAndReceiver(
      transaction.sender_document,
      transaction.receiver_document,
    );
    let isDuplicate = false;
    trans?.forEach((tr) => {
      if (!isDuplicate) {
        tr.date_time;
        let transactionDate = moment(tr.date_time);
        let now = moment();
        let difference = now.diff(transactionDate, 'minutes');
        if (difference < 2) isDuplicate = true;
      }
    });
    return isDuplicate;
  }
}
