import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              password: '123456',
            }),
            findAll: jest.fn().mockResolvedValue([new User()]),
            findOne: jest.fn().mockResolvedValue(new User()),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should return a new user', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123456',
      };
      const result = await userController.create(createUserDto);
      expect(result).toEqual({
        id: '1',
        ...createUserDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userController.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await userController.findOne('1');
      expect(result).toBeInstanceOf(User);
    });
  });
});
