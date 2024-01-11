import { ModelStatic } from 'sequelize';
import { IModelDefine } from '../common/model-define.interface';
import { ModelName } from '../enums/model-name.enum';
import { CustomModelType } from '../common/custom-model.type';

export interface IDatabaseService {
    init: (modelDefines: IModelDefine[]) => Promise<void>;
    getModel: <M extends object, O extends keyof M>(
        modelName: ModelName
    ) => ModelStatic<CustomModelType<M, O>>;
}
