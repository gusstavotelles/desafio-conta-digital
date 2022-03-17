import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import * as moment from 'moment';
import { TransactionRepository } from './transaction.repository';
import { AccountRepository } from '../account/account.repository';

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
    return this.accountService.findAll().then(async (accounts) => {
      try {
        const sender = accounts.find(
          (acc) => acc.document == newTransaction.sender_document,
        );
        const receiver = accounts.find(
          (acc) => acc.document == newTransaction.receiver_document,
        );
        if (receiver && sender) {
          if (newTransaction.value <= sender.available_value) {
            newTransaction.date_time = moment().format();

            if (await !this.checkDuplicate(newTransaction)) {
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

            const result = await this.transactionRepository.create(
              newTransaction,
            );

            if (result) {
              sender.available_value -= newTransaction.value;
              await this.accountRepository.insertUpdate(sender);

              receiver.available_value += newTransaction.value;
              await this.accountRepository.insertUpdate(receiver);
              result.available_value = sender.available_value;
              return result;
            } else {
              throw new HttpException(
                'Failed Operation',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
          } else {
            throw new HttpException(
              newTransaction.value +
                ' is higher than current available value ($' +
                sender.available_value +
                ').',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          throw new HttpException(
            this.noAccountMessage,
            HttpStatus.BAD_REQUEST,
          );
        }
      } catch (err) {
        return err;
      }
    });
  }

  async findByAccount(document: string) {
    return this.transactionRepository.findByAccount(document);
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
