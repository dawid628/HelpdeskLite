import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Weather, WeatherApiResponse } from '../models/weather.model';

/**
 * Service for weather operations
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey = 'd1de816895f84a81b7075721251611';
  private readonly apiUrl = 'https://api.weatherapi.com/v1';

  currentWeather = signal<Weather | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Get current weather for a location
   */
  getCurrentWeather(location: string = 'Warsaw'): Observable<WeatherApiResponse | null> {
    this.loading.set(true);
    this.error.set(null);

    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', location)
      .set('aqi', 'no');

    return this.http.get<WeatherApiResponse>(`${this.apiUrl}/current.json`, { params }).pipe(
      tap({
        next: (response) => {
          const weather: Weather = {
            location: response.location.name,
            country: response.location.country,
            temperature: Math.round(response.current.temp_c),
            condition: response.current.condition.text,
            icon: 'https:' + response.current.condition.icon,
            feels_like: Math.round(response.current.feelslike_c),
            humidity: response.current.humidity,
            wind_kph: Math.round(response.current.wind_kph),
            last_updated: response.current.last_updated
          };

          this.currentWeather.set(weather);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Weather API error:', err);
          this.error.set('Unable to fetch weather data');
          this.loading.set(false);
        }
      }),
      catchError((error) => {
        console.error('Weather API error:', error);
        this.error.set('Unable to fetch weather data');
        this.loading.set(false);
        return of(null);
      })
    );
  }

  /**
   * Get weather by geolocation
   */
  getWeatherByGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          this.getCurrentWeather(coords).subscribe();
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.getCurrentWeather('Warsaw').subscribe();
        }
      );
    } else {
      this.getCurrentWeather('Warsaw').subscribe();
    }
  }
}
