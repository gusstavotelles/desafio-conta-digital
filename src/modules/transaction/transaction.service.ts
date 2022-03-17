import { Inject, Injectable } from '@nestjs/common';
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
              return 'Failed Operation';
            }
          } else {
            return (
              newTransaction.value +
              ' is higher than current available value ($' +
              sender.available_value +
              ').'
            );
          }
        } else {
          return this.noAccountMessage;
        }
      } catch (err) {
        return err;
      }
    });
  }

  async findByAccount(document: string) {
    return this.transactionRepository.findByAccount(document);
  }
}
