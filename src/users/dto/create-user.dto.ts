import { IsString, IsInt, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsOptional()
  @IsString()
  readonly avatar?: string;
}
