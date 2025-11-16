import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

/**
 * Weather banner component displaying current weather
 */
@Component({
  selector: 'app-weather-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-banner.component.html',
  styleUrls: ['./weather-banner.component.css']
})
export class WeatherBannerComponent implements OnInit {
  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeatherByGeolocation();
  }

  /**
   * Refresh weather data
   */
  refreshWeather(): void {
    this.weatherService.getWeatherByGeolocation();
  }
}
