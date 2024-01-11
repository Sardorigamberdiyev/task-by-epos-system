import { App } from './app';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { LoggerService } from './logger/logger.service';
import { PersonModelDefine } from './persons/person.model-define';
import { PersonsController } from './persons/persons.controller';
import { PersonsRepository } from './persons/persons.repository';
import { PersonsService } from './persons/persons.service';

async function bootstrap() {
    const configService = new ConfigService();
    const loggerService = new LoggerService();
    const databaseService = DatabaseService.getInstance(loggerService, [
        new PersonModelDefine(),
    ]);
    // Person module
    const personsRepository = new PersonsRepository(databaseService);
    const personsService = new PersonsService(personsRepository);
    const personsController = new PersonsController(
        loggerService,
        personsService
    );
    // ----------------
    const app = new App(loggerService, configService, databaseService, [
        personsController,
    ]);
    app.init();
}

bootstrap();
