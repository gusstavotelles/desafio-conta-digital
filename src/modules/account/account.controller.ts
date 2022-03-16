import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@ApiTags('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOkResponse({ description: 'Account Created' })
  async create(@Body() createAccountDto: CreateAccountDto) {
    const newAccount = await this.accountService.create(createAccountDto);
    return newAccount;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get Accounts SuccessfulAccounts Created',
    type: Account,
    isArray: true,
  })
  async findAll() {
    const accounts = await this.accountService.findAll();
    // return response.status(HttpStatus.OK).json({
    //   accounts,
    // });
    return accounts;
  }

  @Get(':document')
  async findOne(
    @Res() response,
    @Param('document') document: string,
  ): Promise<any> {
    const account = await this.accountService.findOne(document);
    return account;
  }
}
