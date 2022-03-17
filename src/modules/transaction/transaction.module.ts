import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [AccountModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService,TransactionRepository],
})
export class TransactionModule {}
