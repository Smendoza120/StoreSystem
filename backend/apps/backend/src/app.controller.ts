import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ping-users')
  async pingUsers() {
    const result = await firstValueFrom(
      this.userService.send({ cmd: 'ping' }, {}),
    );
    return result;
  }
}
