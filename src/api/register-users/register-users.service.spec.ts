import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUsersService } from './register-users.service';

describe('RegisterUsersService', () => {
  let service: RegisterUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterUsersService],
    }).compile();

    service = module.get<RegisterUsersService>(RegisterUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
