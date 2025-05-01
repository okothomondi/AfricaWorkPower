import { DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize';
import { BaseModel } from './base.model';

interface UserAttributes {
  id: string;
  username: string;
  githubId: number;
  profileImage: string;
  lastSyncedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'lastSyncedAt'> {}

export class User
  extends BaseModel<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare username: string;
  declare githubId: number;
  declare profileImage: string;
  declare lastSyncedAt?: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public static initialize(sequelize: Sequelize): ModelStatic<User> {
    return sequelize.define<User>(
      'User',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        githubId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        profileImage: {
          type: DataTypes.STRING(500),
          allowNull: false,
          validate: {
            isUrl: true,
          },
        },
        lastSyncedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: 'users',
        timestamps: true,
        indexes: [
          {
            fields: ['username'],
          },
          {
            fields: ['githubId'],
            unique: true,
          },
        ],
      }
    ) as ModelStatic<User>;
  }

  public static associate(models: Record<string, ModelStatic<Model>>): void {
    // Add associations here if needed
  }
}
