// src/models/index.ts
import { Sequelize } from 'sequelize';
import { RequestLog } from './requestLog.model';
import config from '../configurations/config';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.nodeEnv === 'test' ? ':memory:' : './database.sqlite',
  logging: config.nodeEnv === 'development' ? console.log : false,
});

const models = {
  RequestLog: RequestLog.initialize(sequelize),
  sequelize,
  Sequelize,
};

// Set up associations if needed
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
