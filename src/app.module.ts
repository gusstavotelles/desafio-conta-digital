import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './modules/transaction/entities/transaction.entity';
import { Account } from './modules/account/entities/account.entity';

@Module({
  imports: [
    AccountModule,
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'desafio-conta-digital_docker',
      entities: [Transaction, Account],
      synchronize: true,
      dropSchema: true,
    }),
  ],
  exports: [AccountModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
