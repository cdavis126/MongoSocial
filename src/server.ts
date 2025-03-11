import express, { Application } from 'express';
import routes from './routes/routesIndex'; 
import dbConnect from './config/dbConnect'; 

// Importing Mongoose models if needed
// import { User, Thought } from './models/index';

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

// Initialize MongoDB connection
dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}!`);
});
