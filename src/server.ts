import express, { Application } from 'express';
import routes from './routes/routesIndex'; 
import dbConnect from './config/dbConnect';

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

// Initialize MongoDB connection
dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///debugg
app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// 🔥 FIX: Add '/api' prefix
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}!`);
});
