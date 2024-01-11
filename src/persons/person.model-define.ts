import { DataTypes, ModelAttributes, ModelOptions } from 'sequelize';
import { IModelDefine } from '../common/model-define.interface';
import { IPerson } from './person.interface';

export class PersonModelDefine implements IModelDefine<IPerson> {
    public name: string = 'Person';

    public getAttributes(): ModelAttributes {
        return {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birth_year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            death_year: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
            },
        };
    }

    public getOptions(): ModelOptions {
        return { createdAt: false, updatedAt: false };
    }
}
