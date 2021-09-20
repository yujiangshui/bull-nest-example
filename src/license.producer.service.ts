import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class LicenseProducerService {
  constructor(@InjectQueue('license-product-queue') private queue: Queue) {}

  async addJob(productTitle: string) {
    await this.queue.add(
      'add-license-job',
      {
        productTitle,
      },
      { delay: 3000 },
    );
  }

  async deleteJob(productTitle: string) {
    await this.queue.add(
      'delete-license-job',
      {
        productTitle,
      },
      { delay: 5000, attempts: 5 },
    );
  }

  async clear() {
    await this.queue.resume();
  }
}
