import { ModelStatic, Op, WhereOptions } from 'sequelize';
import { IPerson } from './person.interface';
import { IDatabaseService } from '../database/database.service.interface';
import { ModelName } from '../enums/model-name.enum';
import { IPersonsRepository } from './persons.repository.interface';
import { CustomModelType } from '../common/custom-model.type';

export class PersonsRepository implements IPersonsRepository {
    private Model: ModelStatic<CustomModelType<IPerson, 'id' | 'death_year'>>;

    constructor(databaseService: IDatabaseService) {
        this.Model = databaseService.getModel(ModelName.Person);
    }

    public async createOne(person: IPerson) {
        const newPersonModel = await this.Model.create(person);
        const personModel = await newPersonModel.save();
        return personModel.get();
    }

    public async createMany(persons: IPerson[]) {
        const personsModels = await this.Model.bulkCreate(persons);
        return personsModels.map((person) => person.get());
    }

    public async findOne(where?: WhereOptions<Required<IPerson>>) {
        const personModel = await this.Model.findOne({ where });
        return personModel?.get();
    }

    public async findAllWithoutLimit(where?: WhereOptions<Required<IPerson>>) {
        const personsModels = await this.Model.findAll({ where });
        return personsModels.map((person) => person.get());
    }

    public async findStatisticsYear(currentYear: number) {
        const where: WhereOptions<Required<IPerson>> = {
            birth_year: { [Op.lte]: currentYear },
            death_year: {
                [Op.or]: [{ [Op.gte]: currentYear }, { [Op.is]: null }],
            },
        };

        const count = await this.Model.count({
            where,
        });

        const personsModels = await this.Model.findAll({
            where,
            attributes: ['fullname'],
        });

        return {
            count,
            persons: personsModels.map((person) => person.get().fullname),
        };
    }
}
