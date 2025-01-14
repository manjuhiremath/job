import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Reminder = sequelize.define('Reminder', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  jobId: { type: DataTypes.INTEGER, allowNull: false },
  reminderDate: { type: DataTypes.DATEONLY, allowNull: false },
}, { timestamps: true });

export default Reminder;
