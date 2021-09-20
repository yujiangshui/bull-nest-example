import { NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const aQueue = app.get<Queue>(`BullQueue_license-product-queue`);

  const serverAdapter = new ExpressAdapter();

  const { addQueue } = createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter: serverAdapter,
  });

  serverAdapter.setBasePath('/admin/queues');
  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(3000);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
}
bootstrap();
