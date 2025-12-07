import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterUserDto } from './create-register-user.dto';

export class UpdateRegisterUserDto extends PartialType(CreateRegisterUserDto) {}
