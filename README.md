Weather App
The Weather App is a web application built using React and Laravel that provides current weather information, hourly forecasts, and daily forecasts for a specified location. It fetches weather data from the AI Weather API and displays it in an easy-to-read format.

Features
Current weather report including temperature, summary, apparent temperature, humidity, wind speed, and more.
Hourly forecasts for the next few hours with temperature and time information.
Daily forecasts for the next few days with temperature and date information.
Installation
Clone the repository to your local machine:

git clone https://github.com/amansingh331/weather-app.git
Navigate to the project directory:

cd weather-app

Frontend (React)
Install frontend dependencies:

npm install
Start the React development server:


npm start
The app should now be running on http://localhost:3000.

Backend (Laravel)
Navigate to the backend directory:


cd backend
Install backend dependencies using Composer:

composer install
Create a .env file by copying .env.example and set up your database and API keys.

Generate an application key:


php artisan key:generate
Start the Laravel development server:

php artisan serve
The backend API should now be accessible at http://localhost:8000.

Usage
Open your web browser and navigate to http://localhost:3000 to access the Weather App.

Enter the desired location in the search bar and click the "Search" button.

The app will display the current weather report, hourly forecasts, and daily forecasts for the specified location.

Technologies Used
React
Laravel
Bootstrap
AI Weather API
Credits
Weather data provided by the AI Weather API

Contact
For any inquiries or suggestions, please contact mail - amansingh.nitrkl@gmail.com.
