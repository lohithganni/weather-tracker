import app from "./server.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import WeatherDAO from "./dao/weatherDAO.js";

dotenv.config();

const port = process.env.PORT || 8000;

MongoClient.connect(
  process.env.WEATHER_DB_URI,
  {
    wtimeoutMS: 2500, // Example value; set to your preferred timeout in milliseconds
    useUnifiedTopology: true, // Ensures compatibility
    ssl: true, // Enable SSL
    sslValidate: true, // Validate the SSL certificate
    tlsCAFile: '/path/to/ca.pem', // Path to CA file if using custom CA (optional)
  }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await WeatherDAO.injectDB(client); // passed mongodb client to DAO.js
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
