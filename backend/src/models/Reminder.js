import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Reminder = sequelize.define('Reminder', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, primaryKey: true
  },
  sendAt: { type: DataTypes.STRING, allowNull: false },
  message:{type:DataTypes.STRING,allowNull:false},
  email:{type:DataTypes.STRING,allowNull:false}
}, { timestamps: true,tableName: 'reminder' });


sequelize.sync();
export default Reminder;
