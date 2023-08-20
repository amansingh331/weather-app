import React, { useState } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [showCards, setShowCards] = useState(false);
  const [weatherData, setWeatherData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const url = `https://testingapi--amansingh458.repl.co/api/v1/weather/${location}`;

  const handleSearch = () => {
    setIsLoading(true);
    setError('');
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setShowCards(true);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Something went wrong. Please try again.');
        setShowCards(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: 'rgb(157 210 180)' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100" style={{ color: '#282828' }}>
          <div className="col-md-9 col-lg-7 col-xl-5">
            <div className="search-container">
              <input
                id="searchbox"
                className="form-control form-control-lg"
                type="text"
                placeholder="Enter the location"
                aria-label=".form-control-lg example"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="btnl" onClick={handleSearch}>
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}


            {/* First Card */}
            {showCards && (<div className="card mb-4 gradient-custom" style={{ borderRadius: '25px' }}>
              <div className="card-body p-4">
                <div id="demo1" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="d-flex justify-content-between mb-4 pb-2">
                        <div>
                          <h2 className="display-4"><strong>{weatherData.firstdata.temp}°C</strong></h2>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>{weatherData.firstdata.date}</p>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}> <strong>{weatherData.firstdata.summary}</strong></p>
                          <p className="text-muted mb-0">{location}</p>
                        </div>

                        <div>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Apparent Temperature - <strong>{weatherData.firstdata.apparent_temp}°C</strong></p>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Humidity - <strong>{weatherData.firstdata.humidity}%</strong></p>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Wind Speed - <strong>{weatherData.firstdata.wind_speed} Km/h, '{weatherData.firstdata.wind_dir}'</strong></p>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Visibility - <strong> {weatherData.firstdata.visibility}Km</strong></p>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Pressure - <strong>{weatherData.firstdata.pressure} hPa</strong></p>
                          <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Cloud Cover - <strong>{weatherData.firstdata.cloud_cover}%</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

            {/* Second Card */}
            {showCards && (<div className="card mb-4" style={{ borderRadius: '25px' }}>
              <div className="card-body p-4">
                <div id="demo2" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="d-flex justify-content-around text-center mb-4 pb-3 pt-2">
                        
                        {weatherData.hourlyData.map((hour, index) => (
                        <div key={index} className="flex-column">
                          <p className="small"><strong>{hour.temp}°C</strong></p>
                          <i className="fas fa-sun fa-2x mb-3" style={{ color: '#ddd' }}></i>
                          <p className="mb-0"><strong>{hour.time > 12 ? hour.time - 12 : hour.time}:00</strong></p>
                          <p className="mb-0 text-muted" style={{ fontSize: '.65rem' }}>{hour.time > 12 ? 'PM' : 'AM'}</p>
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

            {/* Third Card */}
            {showCards && (<div className="card" style={{ borderRadius: '25px' }}>
              <div className="card-body p-4">
                <div id="demo3" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="d-flex justify-content-around text-center mb-4 pb-3 pt-2">
                        {weatherData.dailyData.map((day, index) => (
                        <div key={index} className="flex-column">
                          <p className="small"><strong>{day.temp}°C</strong></p>
                          <i className="fas fa-sun fa-2x mb-3" style={{ color: '#ddd' }}></i>
                          <p className="mb-0 text-muted"style={{ fontSize: '.65rem' }}>{day.date} {day.month}</p>
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherApp;
