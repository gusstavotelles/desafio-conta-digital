import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  static accounts: Array<Account> = [];

  create(newAccount: CreateAccountDto) {
    // if (
    //   this.findAll().find((account) => account.document == newAccount.document)
    // ) {
    //   return 'conta ja existe';
    // }
    // if (
    //   !newAccount.name ||
    //   !newAccount.document ||
    //   !newAccount.available_value
    // ) {
    //   return 'favor preencher todos os valores';
    // }
    // newAccount.id = (AccountService.accounts.length + 1).toString();
    // AccountService.accounts.push(new Account(newAccount));
    this.accountRepository.save(newAccount);

    return newAccount;
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(document: string) {
    return this.accountRepository.findOne(document);
  }
}
