import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterUsersService } from './register-users.service';
import { CreateRegisterUserDto } from './dto/create-register-user.dto';
import { UpdateRegisterUserDto } from './dto/update-register-user.dto';

@Controller('register-users')
export class RegisterUsersController {
  constructor(private readonly registerUsersService: RegisterUsersService) {}

  @Post()
  create(@Body() createRegisterUserDto: CreateRegisterUserDto) {
    return this.registerUsersService.create(createRegisterUserDto);
  }

  @Get()
  findAll() {
    return this.registerUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterUserDto: UpdateRegisterUserDto) {
    return this.registerUsersService.update(+id, updateRegisterUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerUsersService.remove(+id);
  }
}
