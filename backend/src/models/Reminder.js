import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Reminder = sequelize.define('Reminder', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, primaryKey: true
  },
  jobId: { type: DataTypes.INTEGER, allowNull: false },
  reminderDate: { type: DataTypes.DATEONLY, allowNull: false },
}, { timestamps: true,tableName: 'reminder' });


sequelize.sync();
export default Reminder;
