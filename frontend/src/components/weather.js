import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TenDayForecast from "./tendayforecast";

const api = {
  key: "6fe192e0b03245b6afa142159240407",
  base: "https://api.weatherapi.com/v1",
};

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [degree, setDegree] = useState('c');
  const userkey = 'username';
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem(userkey);
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${api.base}/forecast.json?key=${api.key}&q=${location}&days=10`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Weather data:", data);
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
        setLoading(false);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const addLocation = async () => {
    if (!location) {
      return;
    }
    try {
      console.log('Attempting to add location');
      const response = await fetch('https://weather-tracker-8gkb.onrender.com/api/v1/weather/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, location: location })
      });

      if (response.ok) {
        alert("Location added successfully");
      } else {
        const errorData = await response.json();
        console.error('Attempt failed:', errorData.error);
        alert('Attempt failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error adding location:', error);
      alert('An error occurred while trying to add location.');
    }
  }

  return (
    <>
      {weather && (
        <div className="container">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>
                {weather.location.name}, {weather.location.country}
              </h4>
              {
                username ? (
                  <button onClick={addLocation} className="button-2">Add Location</button>
                ) : (
                  <p>Login to add location</p>
                )
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <img src={weather.current.condition.icon} alt="weather icon" style={{ width: '100px' }} />
                {
                  degree === 'c' ? (
                    <p style={{ fontSize: '50px', margin: '0' }}> {weather.current.temp_c}</p>
                  ) : (
                    <p style={{ fontSize: '50px', margin: '0' }}> {weather.current.temp_f}</p>
                  )
                }
                <button className="button" onClick={() => { setDegree('c') }} style={degree === 'c' ? { backgroundColor: 'grey' } : { backgroundColor: 'transparent' }}>&deg;C</button>
                <button className="button" onClick={() => { setDegree('f') }} style={degree === 'f' ? { backgroundColor: 'grey' } : { backgroundColor: 'transparent' }}>&deg;F</button>
              </div>
              <div className="content mx-2">
                <p>Precipitation: {weather.current.precip_mm}mm</p>
                <p>Humidity: {weather.current.humidity}%</p>
                <p>Wind: {weather.current.wind_kph} km/h</p>
              </div>
            </div>
            <p>Condition: {weather.current.condition.text}</p>
          </div>
        </div>
      )}

      {weather && (
        <div className="mt-5">
          <h3 className="text-center">Forecast</h3>
          <div className="wrapper">
            {weather.forecast.forecastday[0].hour.map((hour, index) => {
              if (index % 2 === 0){
                return (
                  <div
                    key={index}
                    className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 mx-2"
                  >
                    <div className="card text-center">
                      <div className="card-body">
                        <h5 className="card-title">
                          {new Date(hour.time).toLocaleString('en-US', { hour: 'numeric', hour12: true })}
                        </h5>
                        <p className="card-text"> {hour.temp_c}°C</p>
                        <p className="card-text">
                          {hour.condition.text}
                        </p>
                        <img src={hour.condition.icon} alt="weather icon" />
                      </div>
                    </div>
                  </div>
                );}else {
                  return null;
                }
            })}
          </div>
        </div>
      )}
      {weather && <TenDayForecast weather={weather} />}
    </>
  );
};

export default Weather;
