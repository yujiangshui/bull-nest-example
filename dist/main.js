"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma.service");
const api_1 = require("@bull-board/api");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const express_1 = require("@bull-board/express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const aQueue = app.get(`BullQueue_license-product-queue`);
    const serverAdapter = new express_1.ExpressAdapter();
    const { addQueue } = (0, api_1.createBullBoard)({
        queues: [new bullAdapter_1.BullAdapter(aQueue)],
        serverAdapter: serverAdapter,
    });
    serverAdapter.setBasePath('/admin/queues');
    app.use('/admin/queues', serverAdapter.getRouter());
    await app.listen(3000);
    const prismaService = app.get(prisma_service_1.PrismaService);
    prismaService.enableShutdownHooks(app);
}
bootstrap();
//# sourceMappingURL=main.js.map