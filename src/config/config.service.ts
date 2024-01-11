import { DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.service.interface';

export class ConfigService implements IConfigService {
    private parsed: DotenvParseOutput;

    constructor() {
        const { parsed, error } = config();

        if (error || !parsed) throw new Error('Не удалось найти env файл');

        this.parsed = parsed;
    }

    public get(key: string) {
        const value = this.parsed[key];

        if (value === undefined) 
            throw new Error(`Не удалось найти значение по ключу ${key}`);

        return value;
    }
}
