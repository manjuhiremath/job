import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Company = sequelize.define('Company', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contactDetails: { type: DataTypes.STRING },
  industry: { type: DataTypes.STRING },
  companySize: { type: DataTypes.STRING },
  notes: { type: DataTypes.STRING },
}, { timestamps: true, tableName: 'company' });




sequelize.sync(); // CAUTION: This deletes all data in development.

export default Company;
