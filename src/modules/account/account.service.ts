import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  static accounts: Array<Account> = [];

  create(newAccount: CreateAccountDto) {
    if (
      this.findAll().find((account) => account.document == newAccount.document)
    ) {
      return 'conta ja existe';
    }
    if (
      !newAccount.name ||
      !newAccount.document ||
      !newAccount.available_value
    ) {
      return 'favor preencher todos os valores';
    }
    newAccount.id = (AccountService.accounts.length + 1).toString();
    AccountService.accounts.push(new Account(newAccount));
    return newAccount;
  }

  findAll() {
    return AccountService.accounts;
  }
}
