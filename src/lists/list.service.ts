import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async findAllByUser(user: User): Promise<List[]> {
    return this.listRepository.find({ where: { user: { id: user.id } } });
  }

  async findOneByUser(id: string, user: User): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id, user } });
    if (!list) {
      throw new NotFoundException('List not found or you do not have access.');
    }
    return list;
  }

  async create(createListDto: CreateListDto, user: User): Promise<List> {
    const list = this.listRepository.create({
      ...createListDto,
      user,
    });
    return this.listRepository.save(list);
  }

  async remove(id: string, user: User): Promise<void> {
    const list = await this.findOneByUser(id, user);
    await this.listRepository.remove(list);
  }
}
