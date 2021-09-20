"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./product/product.module");
const check_controller_1 = require("./check/check.controller");
const category_module_1 = require("./category/category.module");
const post_service_1 = require("./post.service");
const user_service_1 = require("./user.service");
const prisma_service_1 = require("./prisma.service");
const bull_1 = require("@nestjs/bull");
const license_producer_service_1 = require("./license.producer.service");
const license_consumer_1 = require("./license.consumer");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            bull_1.BullModule.registerQueue({
                name: 'license-product-queue',
            }),
        ],
        controllers: [app_controller_1.AppController, check_controller_1.CheckController],
        providers: [
            app_service_1.AppService,
            post_service_1.PostService,
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            license_producer_service_1.LicenseProducerService,
            license_consumer_1.LicenseConsumer,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map