import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CheckController } from './check/check.controller';
import { CategoryModule } from './category/category.module';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { BullModule } from '@nestjs/bull';
import { LicenseProducerService } from './license.producer.service';
import { LicenseConsumer } from './license.consumer';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'license-product-queue',
    }),
  ],
  controllers: [AppController, CheckController],
  providers: [
    AppService,
    PostService,
    UserService,
    PrismaService,
    LicenseProducerService,
    LicenseConsumer,
  ],
})
export class AppModule {}
