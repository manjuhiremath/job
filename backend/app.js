import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import sequelize from './src/config/database.js';

dotenv.config();

const app = express();

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
sequelize
  .sync({ alter: true }) // use { force: true } only in development; it drops and recreates tables
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database:", error);
  });

start();
export default app;


