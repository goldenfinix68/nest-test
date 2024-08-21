import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { EmailService } from '../email/email.service';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  const mockUser = {
    id: 1,
    email: 'test@test.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            save: jest.fn().mockResolvedValue(mockUser),
          },
        },
        RabbitmqService,
        EmailService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should create a user and trigger email and event', async () => {
    const createUserDto = {
      id: 1,
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
    };

    const user = await service.createUser(createUserDto);

    expect(userModel.create).toHaveBeenCalled();
    expect(userModel.create).toHaveBeenCalledWith(createUserDto);
    expect(user.email).toEqual('test@test.com');
  });
});
