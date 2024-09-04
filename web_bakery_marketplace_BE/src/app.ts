import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from './dbs/init.mongodb';
import dotenv from 'dotenv';

// Import routes
import indexRouter from './routes/index';
import userRouter from './routes/user';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(compression());
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init db
mongoose;
// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
