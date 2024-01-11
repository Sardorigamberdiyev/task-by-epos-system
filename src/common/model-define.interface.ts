import { ModelAttributes, ModelOptions } from 'sequelize';
import { CustomModelType } from './custom-model.type';

export interface IModelDefine<
    M extends object = object,
    O extends keyof M = keyof M
> {
    name: string;
    getAttributes: () => ModelAttributes<CustomModelType<M, O>>;
    getOptions: () => ModelOptions<CustomModelType<M, O>> | undefined;
}
