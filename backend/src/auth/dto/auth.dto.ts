import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@nornex.no', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (minimum 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Ola', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Nordmann', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class AuthResponseDto {
  @ApiProperty()
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };

  @ApiProperty()
  accessToken: string;
}
