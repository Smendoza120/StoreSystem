import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  @MessagePattern({ cmd: 'ping' })
  ping() {
    return { message: 'pong from users microservice' };
  }
}
