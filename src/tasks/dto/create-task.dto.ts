import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Add swagger to the project',
    description: 'A short task description',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  shortDescription: string;

  @ApiProperty({
    example:
      'We need to add swagger to the project so that the project is better documented and new developers can contribute to the project more easily',
    description: 'A long task description',
  })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiProperty({
    description: 'A due date',
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    description: 'Whether the task is currently completed or not',
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean = false;
}
