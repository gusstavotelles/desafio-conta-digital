import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  private invalidDataMessage =
    'Dados inválidos: um dos campos obrigatórios (name, document , available-value) não foi fornecido na operação ou está em branco.';
  private duplicateMessage =
    'Conta já inicializada: já existe uma conta associada ao número de documento informado;';

  async create(newAccount: CreateAccountDto) {
    return this.findAll().then(async (accounts) => {
      if (accounts.some((acc) => acc.document == newAccount.document)) {
        throw new HttpException(this.duplicateMessage, HttpStatus.CONFLICT);
      }
      if (
        !newAccount.name ||
        !newAccount.document ||
        !newAccount.available_value
      ) {
        // return this.invalidDataMessage;
        throw new HttpException(this.invalidDataMessage, HttpStatus.CONFLICT);
      }
      const result = await this.accountRepository.insertUpdate(newAccount);
      return result;
    });
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async findOne(document: string) {
    return this.accountRepository.findOne(document);
  }
}
