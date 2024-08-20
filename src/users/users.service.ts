import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly rabbitMQService: RabbitmqService,
    private readonly emailService: EmailService,
  ) {}

  async createUser(createUserDto: any): Promise<User> {
    const savedUser = await this.userModel.create(createUserDto);

    // Send a dummy email
    this.emailService.sendEmail(savedUser.email);

    // Publish a dummy event to RabbitMQ
    this.rabbitMQService.publishEvent(savedUser);

    return savedUser;
  }
}
