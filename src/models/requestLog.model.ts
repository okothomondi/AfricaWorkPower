import { DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize';
import { BaseModel } from './base.model';

interface RequestLogAttributes {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  responseTime: number;
  ip: string | null;
  userAgent: string | null;
  requestBody: string | null;
  queryParams: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RequestLogCreationAttributes
  extends Optional<
    RequestLogAttributes,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'ip'
    | 'userAgent'
    | 'requestBody'
    | 'queryParams'
  > {}

export class RequestLog extends BaseModel<
  RequestLogAttributes,
  RequestLogCreationAttributes
> {
  declare id: string;
  declare endpoint: string;
  declare method: string;
  declare status: number;
  declare responseTime: number;
  declare ip: string | null;
  declare userAgent: string | null;
  declare requestBody: string | null;
  declare queryParams: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public static initialize(sequelize: Sequelize): ModelStatic<RequestLog> {
    const model = sequelize.define<
      Model<RequestLogAttributes, RequestLogCreationAttributes>
    >(
      'RequestLog',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        endpoint: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        method: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        responseTime: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        ip: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        userAgent: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        requestBody: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        queryParams: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        tableName: 'request_logs',
        timestamps: true,
        paranoid: false,
      }
    ) as ModelStatic<Model<RequestLogAttributes, RequestLogCreationAttributes>>;

    return model as ModelStatic<RequestLog>;
  }

  public static associate(models: Record<string, ModelStatic<Model>>): void {
    // Association logic here if needed
  }
}

export type RequestLogModel = ModelStatic<RequestLog>;
