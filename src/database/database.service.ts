import { Sequelize } from 'sequelize';
import { join } from 'path';
import { IDatabaseService } from './database.service.interface';
import { ILoggerService } from '../logger/logger.service.interface';
import { IModelDefine } from '../common/model-define.interface';
import { ModelName } from '../enums/model-name.enum';

export class DatabaseService implements IDatabaseService {
    private static instance: DatabaseService | undefined;
    private sequelize: Sequelize;

    private constructor(
        private readonly logger: ILoggerService,
        modelDefines: IModelDefine[]
    ) {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: join(__dirname, '../../database.sqlite'),
            logging: false,
        });

        for (const modelDefine of modelDefines) {
            this.sequelize.define(
                modelDefine.name,
                modelDefine.getAttributes(),
                modelDefine.getOptions()
            );
        }
    }

    public async init() {
        await this.sequelize.authenticate();

        await this.sequelize.sync();

        this.logger.info('База данных успешно инициализировано');
    }

    public getModel(modelName: ModelName) {
        return this.sequelize.models[modelName];
    }

    public static getInstance(
        logger: ILoggerService,
        modelDefines: IModelDefine[]
    ) {
        if (this.instance) return this.instance;

        return new DatabaseService(logger, modelDefines);
    }
}
