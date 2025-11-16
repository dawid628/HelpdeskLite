/**
 * Weather data interface
 */
export interface Weather {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
  feels_like: number;
  humidity: number;
  wind_kph: number;
  last_updated: string;
}

/**
 * WeatherAPI response interface
 */
export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    last_updated: string;
  };
}
