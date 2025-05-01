import { DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize';
import { BaseModel } from './base.model';

interface CacheAttributes {
  key: string;
  value: string;
  expiresAt: Date;
}

interface CacheCreationAttributes extends Optional<CacheAttributes, 'key'> {}

export class Cache
  extends BaseModel<CacheAttributes, CacheCreationAttributes>
  implements CacheAttributes
{
  declare key: string;
  declare value: string;
  declare expiresAt: Date;

  public static initialize(sequelize: Sequelize): ModelStatic<Cache> {
    return sequelize.define<Cache>(
      'Cache',
      {
        key: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
        },
        value: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'cache',
        timestamps: true,
        indexes: [
          {
            fields: ['expiresAt'],
          },
        ],
      }
    ) as ModelStatic<Cache>;
  }

  public static associate(models: Record<string, ModelStatic<Model>>): void {
    // Add associations here if needed
  }
}
