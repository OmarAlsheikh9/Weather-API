import express from 'express'
import limiter from './src/middleware/rateLimit.js';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRoute from './src/routes/weather.route.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));


app.use(limiter);
app.use('/v1/weather', weatherRoute);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});