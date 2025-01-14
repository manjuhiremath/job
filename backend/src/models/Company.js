import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Company = sequelize.define('Company', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contactDetails: { type: DataTypes.STRING },
  industry: { type: DataTypes.STRING },
  companySize: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export default Company;
