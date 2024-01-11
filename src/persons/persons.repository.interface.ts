import { WhereOptions } from 'sequelize';
import { IPerson } from './person.interface';

export interface IPersonsRepository {
    findOne: (
        where?: WhereOptions<Required<IPerson>>
    ) => Promise<Required<IPerson> | undefined>;
    findAllWithoutLimit: (
        where?: WhereOptions<Required<IPerson>>
    ) => Promise<Required<IPerson[]>>;
    findStatisticsYear: (
        year: number
    ) => Promise<{ count: number; persons: string[] }>;
    createOne: (peron: IPerson) => Promise<Required<IPerson>>;
    createMany: (persons: IPerson[]) => Promise<Required<IPerson[]>>;
}
