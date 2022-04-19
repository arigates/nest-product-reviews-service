import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('product-created')
  async handleProductCreate(@Payload() data: string, @Ctx() context: RmqContext) {
    await this.appService.createProduct(JSON.parse(data));
  }
}
