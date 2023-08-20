import React from 'react';

function WeatherDisplay({ data }) {
  return (
    <div>
      <h2>Weather Conditions for {data.location}</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
      {/* Display other weather information as needed */}
    </div>
  );
}

export default WeatherDisplay;
