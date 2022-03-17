import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiTags('Create New Account')
  @ApiOkResponse({ description: 'Account Created' })
  async create(@Body() createAccountDto: CreateAccountDto) {
    const newAccount = await this.accountService.create(createAccountDto);
    return newAccount;
  }

  @Get()
  @ApiTags('List All Accounts')
  @ApiOkResponse({
    description: 'Get Accounts Successful',
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
}
