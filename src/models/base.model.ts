import { Model, ModelStatic, Sequelize } from 'sequelize';

export abstract class BaseModel<
  TModelAttributes extends {},
  TCreationAttributes extends {} = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  public static model: ModelStatic<Model>;

  public static initialize(sequelize: Sequelize): ModelStatic<Model> {
    throw new Error('Method not implemented.');
  }

  public static associate?(models: Record<string, ModelStatic<Model>>): void;
}
