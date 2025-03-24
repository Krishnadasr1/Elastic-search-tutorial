import express from "express";
import cors from "cors";
import elasticRoutes from './routes/elastic.routes.js'


const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );

app.use('/api/v1/elastic',elasticRoutes);


export default app;