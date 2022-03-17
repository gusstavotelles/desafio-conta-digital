import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async insertUpdate(newAccount: CreateAccountDto) {
    const result = await this.accountRepository.save(newAccount);
    return result;
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(document: string) {
    return this.accountRepository.findOne({ where: { document: document } });
  }
}
