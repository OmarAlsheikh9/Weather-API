# Weather API

A weather API that fetches real-time weather data from Visual Crossing and caches results with Redis.

> 🔗 Project from [roadmap.sh](https://roadmap.sh/projects/weather-api)

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

```
GET /v1/weather?location={city}
```

**Query Parameters**

| Parameter | Required | Description |
|---|---|---|
| `location` | ✅ Yes | City name or address (e.g. `Cairo`, `London, UK`) |

**Success Response `200`**

```json
{
  "location": "Cairo, Egypt",
  "timezone": "Africa/Cairo",
  "current": {
    "temperature": 34,
    "feelsLike": 32,
    "humidity": 28,
    "windSpeed": 14.4,
    "uvIndex": 8,
    "conditions": "Clear",
    "icon": "clear-day",
    "sunrise": "05:31:00",
    "sunset": "19:48:00"
  },
  "forecast": [
    {
      "date": "2024-08-07",
      "tempMax": 36,
      "tempMin": 26,
      "humidity": 30,
      "windSpeed": 12,
      "conditions": "Clear",
      "icon": "clear-day"
    }
  ]
}
```

**Error Responses**

| Status | Reason |
|---|---|
| `400` | Location parameter missing or city not found |
| `429` | Rate limit exceeded |
| `500` | Weather service unavailable |

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **HTTP Client:** Axios
- **Cache:** Redis
- **Rate Limiting:** express-rate-limit
- **Weather Data:** Visual Crossing API

## Project Structure

```
weather-api/
├── src/
│   ├── middleware/
│   │   └── rateLimit.js        ← rate limiting
│   ├── routes/
│   │   └── weather.route.js    ← route + cache logic
│   └── services/
│       ├── cache.js            ← Redis client
│       └── weather.service.js  ← Visual Crossing API + formatting
├── public/
│   └── index.html              ← frontend UI
├── server.js
├── .env
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A running Redis instance ([Redis Cloud](https://redis.io/cloud/) has a free tier)
- Visual Crossing API key — [get one free here](https://www.visualcrossing.com/weather-api)

### Installation

```bash
git clone <your-repo-url>
cd weather-api
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
WEATHER_API_KEY=your_visual_crossing_api_key

REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password
```

### Run

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) for the UI, or call the API directly:

```bash
curl "http://localhost:3000/v1/weather?location=Cairo"
```

---

## Caching Strategy

- **Cache key:** city name as entered by the user
- **Cache duration:** 1 hour (3600 seconds)
- **Cache hit:** response served from Redis instantly, no API call made
- **Cache miss:** data fetched from Visual Crossing, stored in Redis, then returned
