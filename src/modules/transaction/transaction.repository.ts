import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(newTransaction: CreateTransactionDto) {
    return await this.transactionRepository.save(newTransaction);
  }

  findByAccount(document: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: [{ sender_document: document }, { receiver_document: document }],
    });
  }
}
