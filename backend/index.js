import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"//need to write .env file and connect database
import WeatherDAO from "./dao/weatherDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient
const port =process.env.PORT || 8000
MongoClient.connect(
  process.env.WEATHER_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    wtimeout: 2500,
  }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await WeatherDAO.injectDB(client) //passed mongodb client to DAO.js
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });