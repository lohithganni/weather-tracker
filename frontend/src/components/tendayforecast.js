import React from "react";

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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp (°C)</th>
            <th>Condition</th>
            <th>
              <span class="material-symbols-outlined">air</span> 
            </th>
            <th>UV Index</th>
          </tr>
        </thead>
        <tbody>
          {dayforecast.map((day, index) => (
            <tr key={index} className="table">
              <td>{formatDate(day.date_epoch)}</td>
              <td>
                <strong style={{ fontSize: "25px" }}>
                  {day.day.maxtemp_c}&deg;
                </strong>
                /{day.day.mintemp_c}&deg;
              </td>
              <td>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <span className="condition-text">{day.day.condition.text}</span>
              </td>
              <td>{day.day.maxwind_kph} kph</td>
              <td>{day.day.uv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenDayForecast;
