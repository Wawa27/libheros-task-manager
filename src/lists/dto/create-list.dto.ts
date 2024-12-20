import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({
    example: 'My list name',
    description: "List's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
