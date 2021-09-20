import { Queue } from 'bull';
export declare class LicenseProducerService {
    private queue;
    constructor(queue: Queue);
    addJob(productTitle: string): Promise<void>;
    deleteJob(productTitle: string): Promise<void>;
    clear(): Promise<void>;
}
