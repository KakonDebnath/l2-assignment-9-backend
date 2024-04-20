/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
// use cors middleware
app.use(cors());

// root test route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to assignment 8 backend!');
});

// application routes
app.use('/api/', router);

// global error handlers
app.use(globalErrorHandler);

// not found error handler
app.use(notFound)



export default app;
