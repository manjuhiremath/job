import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, primaryKey: true
  },
  companyName: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  applicationDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT },
  fileUrl: {type:DataTypes.STRING}
}, { timestamps: true, tableName: 'job' });


sequelize.sync();
export default Job;
