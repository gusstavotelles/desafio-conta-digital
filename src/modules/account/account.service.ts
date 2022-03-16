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
  private invalidDataMessage =
    'Dados inválidos: um dos campos obrigatórios (name, document , available-value) não foi fornecido na operação ou está em branco.';
  private duplicateMessage =
    'Conta já inicializada: já existe uma conta associada ao número de documento informado;';


  async create(newAccount: CreateAccountDto) {
    return this.findAll().then(async (accounts) => {
      if (accounts.some((acc) => acc.document == newAccount.document)) {
        return this.duplicateMessage;
      }
      if (
        !newAccount.name ||
        !newAccount.document ||
        !newAccount.available_value
      ) {
        return this.invalidDataMessage;
      }
      const result = await this.accountRepository.save(newAccount);
      return result;
    });
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(document: string) {
    return this.accountRepository.findOne(document);
  }
}
