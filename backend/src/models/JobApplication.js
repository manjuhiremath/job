import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Job = sequelize.define('Job', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  companyName: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  applicationDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export default Job;
