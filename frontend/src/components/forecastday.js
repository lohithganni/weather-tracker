import React, { useState } from "react";

const ForecastDay = ({ day, index, formatDate }) => {
  const [display, setDisplay] = useState(false);

  const handleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      {!display && (
        <tr
          key={index}
          className="table"
          onClick={handleDisplay}
          style={{ cursor: "pointer" }}
        >
          <td>{formatDate(day.date_epoch)}</td>
          <td>
            <strong style={{ fontSize: "25px" }}>
              {day.day.maxtemp_c}&deg;
            </strong>
            /{day.day.mintemp_c}&deg;
          </td>
          <td>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                style={{ marginRight: "8px",heigh:'auto',width:'100%',maxWidth:'100px' }}
              />
              <span className="condition-text">{day.day.condition.text}</span>
            </div>
          </td>
          <td>{day.day.maxwind_kph} kph</td>
          <td>{day.day.uv}</td>
          <td className="arrowkey">
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </td>
        </tr>
      )}
      {display && (
        <>
          <tr onClick={handleDisplay}>
            <td colSpan="4">
              <div
                style={{
                  flex: "2 1 100%",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                <h4>{formatDate(day.date_epoch)} Detailed Forecast</h4>
              </div>
              <div
                style={{
                  flex: "2 1 100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={day.day.condition.icon}
                  alt="weather icon"
                  style={{ width: "100px", marginRight: "8px" }}
                />
                <div style={{ textAlign: "center" }}>
                  {day.day.condition.text}
                </div>
              </div>
            </td>
            <td>
              <span className="material-symbols-outlined">keyboard_arrow_up</span>
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              <div
                style={{
                  padding: "10px",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: "#f9f9f9",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <div>
                  <strong>Average Temp:</strong> {day.day.avgtemp_c}&deg;C
                </div>
                <div>
                  <strong>Max Temp:</strong> {day.day.maxtemp_c}&deg;C
                </div>
                <div>
                  <strong>Min Temp:</strong> {day.day.mintemp_c}&deg;C
                </div>
                <div>
                  <strong>Precipitation:</strong> {day.day.totalprecip_mm} mm
                </div>
                <div>
                  <strong>Visibility:</strong> {day.day.avgvis_km} km
                </div>
                <div>
                  <strong>Wind Speed:</strong> {day.day.maxwind_kph} kph
                </div>
                <div>
                  <strong>Humidity:</strong> {day.day.avghumidity}%
                </div>
                <div>
                  <strong>Sunrise:</strong> {day.astro.sunrise}
                </div>
                <div>
                  <strong>Sunset:</strong> {day.astro.sunset}
                </div>
                <div>
                  <strong>Moonrise:</strong> {day.astro.moonrise}
                </div>
                <div>
                  <strong>Moonset:</strong> {day.astro.moonset}
                </div>
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default ForecastDay;
