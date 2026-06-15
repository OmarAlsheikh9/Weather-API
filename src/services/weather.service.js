import axios from "axios";

export async function getWeather(location) {
  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`,
    {
      params: {
        key: process.env.WEATHER_API_KEY,
        unitGroup: "metric", // celsius
        include: "current,days", // only current + daily forecast
        contentType: "json",
      },
    },
  );
  const result = formatResponseWeather(response.data);
  return result;
}

function formatResponseWeather(data) {
  return {
    location: data.resolvedAddress,
    timezone: data.timezone,
    current: {
      temperature: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      uvIndex: data.currentConditions.uvindex,
      conditions: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
      sunrise: data.currentConditions.sunrise,
      sunset: data.currentConditions.sunset,
    },
    forecast: data.days.slice(0, 7).map((day) => ({
      // next 7 days
      date: day.datetime,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      humidity: day.humidity,
      windSpeed: day.windspeed,
      conditions: day.conditions,
      icon: day.icon,
    })),
  };
}
