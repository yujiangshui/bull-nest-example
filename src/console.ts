import * as repl from 'repl';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // const appService = app.get(AppService);
  // start node repl
  const server = repl.start({
    useColors: true,
    prompt: '> ',
    ignoreUndefined: true,
  });
  server.context.app = app;
}
bootstrap();

// run AppService = require('./src/app.service')['AppService'] ser = app.get(AppService)
