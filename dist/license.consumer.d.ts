import { Job } from 'bull';
import { Queue } from 'bull';
export declare class LicenseConsumer {
    private queue;
    constructor(queue: Queue);
    addLicense(job: Job<unknown>): Promise<{
        test: string;
    }>;
    onActive(job: Job): void;
    deleteLicense(job: Job<{
        productTitle: string;
    }>): Promise<void>;
}
