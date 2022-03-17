import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiTags('Create New Transaction')
  @ApiOkResponse({ description: 'Transaction done' })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const newTransaction = await this.transactionService.create(
      createTransactionDto,
    );
    return newTransaction;
  }

  @Get(':document')
  @ApiTags('Find Transactions By Account')
  @ApiOkResponse({
    description: 'Get Transactions by Account Successful',
    type: Transaction,
    isArray: true,
  })
  async findByAccount(
    @Param('document') document: string,
  ): Promise<Transaction[]> {
    const transaction = await this.transactionService.findByAccount(document);
    return transaction;
  }
}
