import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TaskModule } from '../tasks/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), TaskModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
