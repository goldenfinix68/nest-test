import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';

@Module({
  providers: [RabbitmqService],
  controllers: [RabbitmqController]
})
export class RabbitmqModule {}
