"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require("repl");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const server = repl.start({
        useColors: true,
        prompt: '> ',
        ignoreUndefined: true,
    });
    server.context.app = app;
}
bootstrap();
//# sourceMappingURL=console.js.map