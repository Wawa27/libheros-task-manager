import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { User } from '../users/user.entity';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [
        ListService,
        {
          provide: ListService,
          useValue: {
            create: jest.fn(),
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

    jest.spyOn(service, 'create').mockResolvedValue(createListDto as any);

    const result = await controller.create(createListDto, userMock);

    expect(service.create).toHaveBeenCalledWith(createListDto, userMock);
    expect(result).toEqual(createListDto);
  });
});
