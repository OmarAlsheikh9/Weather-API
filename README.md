# Weather API

A weather API that fetches real-time weather data from Visual Crossing and caches results with Redis.

> 🔗 Project from [roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service)
---

## Features

- Real-time weather data from [Visual Crossing API](https://www.visualcrossing.com/weather-api)
- Redis caching — cached responses served instantly, API only called when needed
- Rate limiting — max 100 requests per IP per 15 minutes
- 7-day forecast included in every response
- Clean frontend UI to search any city

---

## API Endpoints

### Get Weather
