import { AddPersonListDTO } from './dto/add-person-list.dto';
import { AddPersonDTO } from './dto/add-person.dto';
import { GetPersonsStatisticsDTO } from './dto/get-persons-statistics.dto';
import { IPerson } from './person.interface';

export interface IPersonsService {
    addPerson: (addPersonDto: AddPersonDTO) => Promise<Required<IPerson>>;
    addPersonList: (
        addPersonListDto: AddPersonListDTO
    ) => Promise<Required<IPerson[]>>;
    getPersonsStatistics: (
        getPersonsStatisticsDto: GetPersonsStatisticsDTO
    ) => Promise<IStatisticsYear[]>;
}

export interface IStatisticsYear {
    year: number;
    persons: string[];
    count: number;
}
