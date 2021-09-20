"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const repl = require("repl");
const Logger = require("purdy");
const LOGGER_OPTIONS = {
    indent: 2,
    depth: 1,
};
class InteractiveNestJS {
    async run() {
        const targetModule = require(`${__dirname}/app.module`);
        const applicationContext = await core_1.NestFactory.createApplicationContext(targetModule['AppModule']);
        const awaitOutside = require('await-outside');
        const server = repl.start({
            useColors: true,
            prompt: '> ',
            writer: replWriter,
            ignoreUndefined: true,
        });
        server.context.app = applicationContext;
        awaitOutside.addAwaitOutsideToReplServer(server);
    }
}
function replWriter(value) {
    return Logger.stringify(value, LOGGER_OPTIONS);
}
const session = new InteractiveNestJS();
session.run();
//# sourceMappingURL=console2.js.map