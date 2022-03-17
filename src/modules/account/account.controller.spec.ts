import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should return an array of cats', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(await controller.findAll()).toBe(result);
  });
});
