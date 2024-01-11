import { Model, Optional } from 'sequelize';

export type CustomModelType<M extends object, O extends keyof M> = Model<
    Required<M>,
    Optional<M, O>
>;
