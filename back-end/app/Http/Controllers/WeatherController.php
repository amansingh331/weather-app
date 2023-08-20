<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use DateTime;

// weather current report class
class WeatherCurrRepo {
    public $temp;
    public $summary;
    public $date;
    public $apparent_temp;
    public $humidity;
    public $wind_speed;
    public $wind_dir;
    public $visibility;
    public $pressure;
    public $cloud_cover;

    public function __construct($temp, $summary, $date, $apparent_temp, $humidity, $wind_speed, $wind_dir, $visibility, $pressure, $cloud_cover) {
      $this->temp = $temp;
      $this->summary = $summary;
      $this->date = $date;
      $this->apparent_temp = $apparent_temp;
      $this->humidity = $humidity;
      $this->wind_speed = $wind_speed;
      $this->wind_dir = $wind_dir;
      $this->visibility = $visibility;
      $this->pressure = $pressure;
      $this->cloud_cover = $cloud_cover;
    }
}

// weather hourly report class
class WeatherHourlyRepo {
  public $time;
  Public $temp;
  public function __construct($time, $temp){
    $this->time = $time;
    $this->temp = $temp;
  }
}

// weather daily report
class WeatherDailyRepo {
  public $date;
  public $month;
  Public $temp;
  public function __construct($date, $month, $temp){
    $this->date = $date;
    $this->month = $month;
    $this->temp = $temp;
  }
}



class WeatherController extends Controller
{
  // function to fetch hourly data
  private function fetchhourlydata($data){
    $hourlytab = [];
    for ($i = 1; $i <= 5; $i++) {
      $datetimeString = $data['hourly']['data'][$i]['date'];
      $dateTime = new DateTime($datetimeString);
      $hour = $dateTime->format('H');
      $fi = new WeatherHourlyRepo(
        $hour,
        $data['hourly']['data'][$i]['temperature']
      );
      $hourlytab[] = $fi;
    }
    return $hourlytab;
  }
  // function to fetch daily data
  private function fetchDailyData($city){
    $curl = curl_init();
    curl_setopt_array($curl, [
    	CURLOPT_URL => "https://ai-weather-by-meteosource.p.rapidapi.com/daily?place_id=".$city."&timezone=auto&language=en&units=metric",
    	CURLOPT_RETURNTRANSFER => true,
    	CURLOPT_ENCODING => "",
    	CURLOPT_MAXREDIRS => 10,
    	CURLOPT_TIMEOUT => 30,
    	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    	CURLOPT_CUSTOMREQUEST => "GET",
    	CURLOPT_HTTPHEADER => [
		    "X-RapidAPI-Host: ai-weather-by-meteosource.p.rapidapi.com",
		    "X-RapidAPI-Key: cea5ba2932msh140b4269b5e034ap1a8a51jsn91282fb1a285"
	    ],
    ]);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    $dailytab = [];

    if ($err) {
      echo "cURL Error #:" . $err;
    } else {
      $data = json_decode($response, true);

      for($i=1; $i<=5; $i++){
        $dateString = $data['daily']['data'][$i]['day'];
        $timestamp = strtotime($dateString);
        $finalmonth = date('M', $timestamp); 
        $day = date('d', $timestamp);

        $fi = new WeatherDailyRepo(
          $day, 
          $finalmonth,
          $data['daily']['data'][$i]['temperature'],
        );
        $dailytab[] = $fi;
      }
    }
    return $dailytab;
  }

  // function for collecting all the weather data
  public function getWeatherData($city)
  {
    $curl = curl_init();
    curl_setopt_array($curl, [
    	CURLOPT_URL => "https://ai-weather-by-meteosource.p.rapidapi.com/hourly?place_id=".$city."&timezone=auto&language=en&units=metric",
    	CURLOPT_RETURNTRANSFER => true,
    	CURLOPT_ENCODING => "",
    	CURLOPT_MAXREDIRS => 10,
    	CURLOPT_TIMEOUT => 30,
    	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    	CURLOPT_CUSTOMREQUEST => "GET",
    	CURLOPT_HTTPHEADER => [
	      "X-RapidAPI-Host: ai-weather-by-meteosource.p.rapidapi.com",
	      "X-RapidAPI-Key: cea5ba2932msh140b4269b5e034ap1a8a51jsn91282fb1a285"
	    ],
    ]);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
      echo "cURL Error #:" . $err;
    } else {
      $data = json_decode($response, true);
      $dateString = $data['hourly']['data'][0]['date'];
      $timestamp = strtotime($dateString);
      $formattedDate = date('d M Y', $timestamp);

      $weatherData = new WeatherCurrRepo(
        $data['hourly']['data'][0]['temperature'],
        $data['hourly']['data'][0]['summary'],
        $formattedDate,
        $data['hourly']['data'][0]['feels_like'],
        $data['hourly']['data'][0]['humidity'],
        $data['hourly']['data'][0]['wind']['speed'],
        $data['hourly']['data'][0]['wind']['dir'],
        $data['hourly']['data'][0]['visibility'],
        $data['hourly']['data'][0]['pressure'],
        $data['hourly']['data'][0]['cloud_cover']
      );
      $hourlytab = $this->fetchhourlydata($data);
      $dailytab = $this->fetchDailyData($city);

      $final = [
        'firstdata' => $weatherData,
        'hourlyData' => $hourlytab,
        'dailyData' => $dailytab
      ];

      return response()->json($final);
    }
}
}