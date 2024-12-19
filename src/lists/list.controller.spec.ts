import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { User } from '../users/user.entity';
import { List } from './list.entity';

describe('ListController', () => {
  let controller: ListController;
  let service: ListService;

  const userMock: User = {
    id: 'user-id',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
    lists: [],
  };

  const listMock: List = {
    id: 'list-id',
    name: 'My List',
    user: userMock,
    tasks: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [
        {
          provide: ListService,
          useValue: {
            findAllByUser: jest.fn(),
            findOneByUser: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ListController>(ListController);
    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a list', async () => {
    const createListDto: CreateListDto = { name: 'My List' };

    jest.spyOn(service, 'create').mockResolvedValue(listMock);

    const result = await controller.create(createListDto, userMock);

    expect(service.create).toHaveBeenCalledWith(createListDto, userMock);
    expect(result).toEqual(listMock);
  });

  it('should return all lists for the user', async () => {
    jest.spyOn(service, 'findAllByUser').mockResolvedValue([listMock]);

    const result = await controller.findAll(userMock);

    expect(service.findAllByUser).toHaveBeenCalledWith(userMock);
    expect(result).toEqual([listMock]);
  });

  it('should return a single list by ID', async () => {
    jest.spyOn(service, 'findOneByUser').mockResolvedValue(listMock);

    const result = await controller.findOne('list-id', userMock);

    expect(service.findOneByUser).toHaveBeenCalledWith('list-id', userMock);
    expect(result).toEqual(listMock);
  });

  it('should delete a list', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const result = await controller.remove('list-id', userMock);

    expect(service.remove).toHaveBeenCalledWith('list-id', userMock);
    expect(result).toBeUndefined();
  });
});
