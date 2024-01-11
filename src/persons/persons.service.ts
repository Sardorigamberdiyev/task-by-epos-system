import { Op } from 'sequelize';
import { HTTPError } from '../errors/http-error';
import { AddPersonDTO } from './dto/add-person.dto';
import { AddPersonListDTO } from './dto/add-person-list.dto';
import { GetPersonsStatisticsDTO } from './dto/get-persons-statistics.dto';
import { PersonEntity } from './person.entity';
import { IPersonsRepository } from './persons.repository.interface';
import { HTTPStatus } from '../enums/http-status.enum';
import { IPersonsService, IStatisticsYear } from './persons.service.interface';

export class PersonsService implements IPersonsService {
    constructor(private readonly personsRepository: IPersonsRepository) {}

    public async getPersonsStatistics(dto: GetPersonsStatisticsDTO) {
        const startYear = +dto.startYear;
        const endYear = +dto.endYear;

        const statisticsYears: IStatisticsYear[] = [];

        if (endYear < startYear)
            throw new HTTPError('startYear недолжен быть болше endYear');

        const rangeYear = endYear - startYear;

        for (let i = 0; i <= rangeYear; i++) {
            const year = startYear + i;
            // Получаем статистику этого года
            const statisticsYear =
                await this.personsRepository.findStatisticsYear(year);
            // Добавляем полученную статистику в список статистикс годов
            statisticsYears.push({
                year,
                ...statisticsYear,
            });
        }
        // Сортируем статистику по убыванию мак. кол-во людей
        return statisticsYears.sort((a, b) => b.count - a.count);
    }

    public async addPerson(dto: AddPersonDTO) {
        const { fullname } = dto;
        // Ищем кандидата на эту ФИО
        const candidate = await this.personsRepository.findOne({ fullname });
        // Если уже сущ. с таким ФИО то выбрасываем ошибку
        if (candidate)
            throw new HTTPError(
                'Человек с таким ФИО уже существует',
                HTTPStatus.BadRequest
            );

        const personEntity = new PersonEntity(dto);
        // Добавляем person в БД
        return this.personsRepository.createOne(personEntity);
    }

    public async addPersonList({ personList }: AddPersonListDTO) {
        // Находим из БД кандидатов на данных ФИО
        const candidateList = await this.personsRepository.findAllWithoutLimit({
            [Op.or]: personList.map(({ fullname }) => ({ fullname })),
        });
        // Если уже есть люди с такими ФИО то обрабатываем ошибок
        if (candidateList.length) {
            throw new HTTPError(
                'Люди с такими ФИО уже существует',
                HTTPStatus.BadRequest,
                candidateList.map((candidate) => candidate.fullname)
            );
        }

        const personsEntities = personList.map(
            (personDto) => new PersonEntity(personDto)
        );
        return this.personsRepository.createMany(personsEntities);
    }
}
