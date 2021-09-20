import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { Queue } from 'bull';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
@Processor('license-product-queue')
export class LicenseConsumer {
  constructor(@InjectQueue('license-product-queue') private queue: Queue) {}

  @Process('add-license-job')
  async addLicense(job: Job<unknown>) {
    console.log('add job: ', job.data);
    let progress = 0;
    for (let i = 0; i < 10; i++) {
      await sleep(2000);
      progress += 10;
      console.log('progress: ', progress);
      await job.log('Progress: ' + progress);
      await job.progress(progress);
    }

    await this.queue.add(
      'delete-license-job',
      {
        productTitle: '21232',
      },
      { delay: 5000, attempts: 5 },
    );

    return {
      test: 'haha',
    };
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('delete-license-job')
  async deleteLicense(job: Job<{ productTitle: string }>) {
    console.log('delete job: ', job.data);
    if (job.attemptsMade < 4) {
      console.log('job.attemptsMade: ', job.attemptsMade);
      throw new Error('Error');
    }
    // if (job.data.productTitle !== '111') {
    //   throw new Error('Error');
    // }
  }
}
