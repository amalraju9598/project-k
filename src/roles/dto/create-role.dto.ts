import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  pages?: any; // JSON data
}
