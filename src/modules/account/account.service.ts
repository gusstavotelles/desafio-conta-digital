import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  private accounts: Array<Account> = [];

  create(newAccount: CreateAccountDto) {
    console.log(newAccount);
    if (
      this.findAll().find(
        (account) => account.document == newAccount.document,
      )
    ) {
      return 'conta ja existe';
    }
    if (
      !!newAccount.name ||
      !!newAccount.document ||
      !!newAccount.available_value
    ){
      return 'favor preencher todos os valores';
    }
      return newAccount;
  }

  findAll() {
    const accounts: Account[] = [];
    return accounts;
  }
}
