import express, { Application, Request, Response } from 'express';
import path from 'path';
import apiRoutes from './routes/api';

const app: Application = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.use('/api', apiRoutes);

const angularAppPath = path.join(__dirname, '../angular/dist/angular');
app.use(express.static(angularAppPath));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(angularAppPath, 'index.html'));
});

export default app;