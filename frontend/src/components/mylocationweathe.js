import React, { useState, useEffect } from "react";

const api = {
  key: '6fe192e0b03245b6afa142159240407',
  base: 'https://api.weatherapi.com/v1',
};

const MyLocationWeather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [degree, setDegree] = useState("c");
  const [username, setUsername] = useState(null);
  const userkey = 'username';

  useEffect(() => {
    const storedUser = localStorage.getItem(userkey);
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const currentWeatherRes = await fetch(
          `${api.base}/forecast.json?key=${api.key}&q=${location}`
        );
        if (!currentWeatherRes.ok) {
          throw new Error(
            `Failed to fetch weather data: ${currentWeatherRes.statusText}`
          );
        }
        const currentWeatherData = await currentWeatherRes.json();
        console.log("Current weather data:", currentWeatherData);
        if (isMounted) {
          setWeather(currentWeatherData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching current weather:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (location) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [location]);

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete location');
      const response = await fetch('http://localhost:5000/api/v1/weather/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, location: location })
      });

      if (response.ok) {
        alert("Location removed successfully");
      } else {
        const errorData = await response.json();
        console.error('Attempt failed:', errorData.error);
        alert('Attempt failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="cards my-4 " style={{backgroundColor:"rgb(254, 250, 250)"}}>
        {weather && (
          <>
            <h3>{weather.location.name}, {weather.location.country}</h3>
            <div className="item1">
              <img src={weather.current.condition.icon} alt="weather icon" style={{ width: '100px' }} />
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {degree === 'c' ? (
                  <p style={{ fontSize: '25px', margin: '0' }}> {weather.current.temp_c}</p>
                ) : (
                  <p style={{ fontSize: '25px', margin: '0' }}> {weather.current.temp_f}</p>
                )}
                <button className="button" onClick={() => setDegree('c')} style={degree === 'c' ? { backgroundColor: '#D4D9E1' } : { backgroundColor: 'transparent' }}>&deg;c</button>
                <button className="button" onClick={() => setDegree('f')} style={degree === 'f' ? { backgroundColor: 'grey' } : { backgroundColor: 'transparent' }}>&deg;f</button>
              </div>
              <div className="item1">
                <div className="item2">
                  <p className="p1">Max Temp:</p>
                  <p className="p2">{degree === 'c' ? weather.forecast.forecastday[0].day.maxtemp_c : weather.forecast.forecastday[0].day.maxtemp_f} &deg;{degree}</p>
                </div>
                <div className="item2">
                  <p className="p1">Min Temp:</p>
                  <p className="p2">{degree === 'c' ? weather.forecast.forecastday[0].day.mintemp_c : weather.forecast.forecastday[0].day.mintemp_f} &deg;{degree}</p>
                </div>
                <div className="item2">
                  <p className="p1">Feels Like:</p>
                  <p className="p2">{degree === 'c' ? weather.current.feelslike_c : weather.current.feelslike_f} &deg;{degree}</p>
                </div>
                <div className="item2">
                  <p className="p1">UV Index:</p>
                  <p className="p2">{weather.current.uv}</p>
                </div>
                <div className="item2">
                  <p className="p1">Precipitation:</p>
                  <p className="p2"> {weather.current.precip_mm}mm</p>
                </div>
                <div className="item2">
                  <p className="p1">Humidity:</p>
                  <p className="p2"> {weather.current.humidity}%</p>
                </div>
                <div className="item2">
                  <p className="p1">Wind:</p>
                  <p className="p2">{weather.current.wind_kph} km/h</p>
                </div>
              </div>
              <button className="button-3 my-2" onClick={handleDelete}>Remove location</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyLocationWeather;
