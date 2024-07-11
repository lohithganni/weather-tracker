import React from "react";
import ForecastDay from "./forecastday";

const TenDayForecast = ({ weather }) => {
  const dayforecast = weather.forecast.forecastday;

  const formatDate = (epoch) => {
    const date = new Date(epoch * 1000);
    const day = date.getDate();
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    return `${day} ${dayOfWeek}`;
  };

  return (
    <div className="container mt-4">
      <h3>10-Day Weather</h3>
      <table className="table ">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp (°C)</th>
            <th>Condition</th>
            <th>
              <span className="material-symbols-outlined">air</span>
            </th>
            <th>UV Index</th>
            
          </tr>
        </thead>
        <tbody>
          {dayforecast.map((day, index) => (
            <ForecastDay key={index} day={day} index={index} formatDate={formatDate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenDayForecast;
