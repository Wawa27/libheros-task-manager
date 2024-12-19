import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'libheros@gmail.com',
    description: "User's email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456password',
    description: "User's password",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
