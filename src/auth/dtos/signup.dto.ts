import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'Usuario Regular',
  ADMIN = 'Administrador',
}

export class SignupDto {
  @IsNotEmpty()
  @IsEnum(Role, {
    message: `Please enter a valid role, try with:"${Role.USER}"or"${Role.ADMIN}"`,
  })
  @ApiProperty()
  readonly role: Role;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @ApiProperty()
  readonly password: string;
}
