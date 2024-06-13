import express from 'express';
import Route from './src/routes';
import dotenv from "dotenv"
import { setupSwagger } from './swagger';

dotenv.config()
const app = express();
const port = 4000;

app.use(express.json())
setupSwagger(app)

app.use('/api/v1', Route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
