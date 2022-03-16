import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOkResponse({ description: 'Transaction done' })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const newTransaction = await this.transactionService.create(
      createTransactionDto,
    );
    return newTransaction;
  }

  @Get()
  @ApiOkResponse({
    description: 'Accounts Created',
    type: Transaction,
    isArray: true,
  })
  async findAll() {
    const accounts = await this.transactionService.findAll();
    // return response.status(HttpStatus.OK).json({
    //   accounts,
    // });
    return accounts;
  }

  @Get(':sender_document')
  async findOne(
    @Res() response,
    @Param('sender_document') sender_document: string,
  ): Promise<any> {
    const transaction = await this.transactionService.findOne(sender_document);
    return transaction;
  }
}
