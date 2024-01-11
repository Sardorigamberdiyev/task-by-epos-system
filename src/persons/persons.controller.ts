import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ILoggerService } from '../logger/logger.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AddPersonDTO } from './dto/add-person.dto';
import { GetPersonsStatisticsDTO } from './dto/get-persons-statistics.dto';
import { AddPersonListDTO } from './dto/add-person-list.dto';
import { IPersonsService } from './persons.service.interface';

export class PersonsController extends BaseController {
    constructor(
        logger: ILoggerService,
        private readonly personsService: IPersonsService
    ) {
        super(logger);
        this.attachControllers([
            {
                method: 'get',
                path: '/persons',
                controller: this.getPersonsStatistics,
                middlewares: [
                    new ValidateMiddleware(GetPersonsStatisticsDTO, true),
                ],
            },
            {
                method: 'post',
                path: '/persons',
                controller: this.addPerson,
                middlewares: [new ValidateMiddleware(AddPersonDTO)],
            },
            {
                method: 'post',
                path: '/persons/list',
                controller: this.addPersonList,
                middlewares: [new ValidateMiddleware(AddPersonListDTO)],
            },
        ]);
    }

    public async getPersonsStatistics(
        req: Request<{}, {}, {}, GetPersonsStatisticsDTO & qs.ParsedQs>,
        res: Response
    ) {
        const persons = await this.personsService.getPersonsStatistics(
            req.query
        );

        this.ok(res, persons);
    }

    public async addPerson(req: Request<{}, {}, AddPersonDTO>, res: Response) {
        const addedPerson = await this.personsService.addPerson(req.body);
        this.created(res, addedPerson);
    }

    public async addPersonList(
        req: Request<{}, {}, AddPersonListDTO>,
        res: Response
    ) {
        const addedPersons = await this.personsService.addPersonList(req.body);
        this.created(res, addedPersons);
    }
}
