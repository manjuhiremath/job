import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import sequelize from './src/config/database.js';
import Company from './src/models/Company.js';
import User from './src/models/User.js';
import Job from './src/models/JobApplication.js';
import Reminder from './src/models/Reminder.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
User.hasMany(Company, { foreignKey: { id: 'userId', allowNull: true }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Company.belongsTo(User, { foreignKey: { id: 'userId', allowNull: true }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

User.hasMany(Job, { foreignKey: "userId" });
Job.belongsTo(User, { foreignKey: "userId" });

app.use(bodyParser.json());
app.use('/api', routes);

const start = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(process.env.PORT + " : connected");
    });
  } catch (error) {
    console.log(error);
  }
};

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


start();
export default app;


