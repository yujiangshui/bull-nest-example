"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
let LicenseConsumer = class LicenseConsumer {
    constructor(queue) {
        this.queue = queue;
    }
    async addLicense(job) {
        console.log('add job: ', job.data);
        let progress = 0;
        for (let i = 0; i < 10; i++) {
            await sleep(2000);
            progress += 10;
            console.log('progress: ', progress);
            await job.log('Progress: ' + progress);
            await job.progress(progress);
        }
        await this.queue.add('delete-license-job', {
            productTitle: '21232',
        }, { delay: 5000, attempts: 5 });
        return {
            test: 'haha',
        };
    }
    onActive(job) {
        console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
    async deleteLicense(job) {
        console.log('delete job: ', job.data);
        if (job.attemptsMade < 4) {
            console.log('job.attemptsMade: ', job.attemptsMade);
            throw new Error('Error');
        }
    }
};
__decorate([
    (0, bull_1.Process)('add-license-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LicenseConsumer.prototype, "addLicense", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LicenseConsumer.prototype, "onActive", null);
__decorate([
    (0, bull_1.Process)('delete-license-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LicenseConsumer.prototype, "deleteLicense", null);
LicenseConsumer = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('license-product-queue'),
    __param(0, (0, bull_1.InjectQueue)('license-product-queue')),
    __metadata("design:paramtypes", [Object])
], LicenseConsumer);
exports.LicenseConsumer = LicenseConsumer;
//# sourceMappingURL=license.consumer.js.map