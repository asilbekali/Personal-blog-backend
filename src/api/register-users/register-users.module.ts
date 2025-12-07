import { Module } from '@nestjs/common';
import { RegisterUsersService } from './register-users.service';
import { RegisterUsersController } from './register-users.controller';

@Module({
  controllers: [RegisterUsersController],
  providers: [RegisterUsersService],
  exports: [RegisterUsersService],
})
export class RegisterUsersModule {}
