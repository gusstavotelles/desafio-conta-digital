import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account, IAccount } from './entities/account.entity';

@Controller('account')
@ApiTags('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOkResponse({ description: 'Account Created' })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Accounts Created',
    type: Account,
    isArray: true,
  })
  findAll() {
    return this.accountService.findAll();
  }
}
