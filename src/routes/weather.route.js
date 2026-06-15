import express from "express";
import cache from "../services/cache.js";
import { getWeather } from "../services/weather.service.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const cachedData = await cache.get(location);
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  try {
    const result = await getWeather(location);
    await cache.set(location, JSON.stringify(result), 3600); // cache for 1 hour
    res.status(200).json(result);
  } catch (err) {
    if (err.response?.status === 400) {
      return res.status(400).json({ error: "City not found" });
    }
    if (err.response?.status === 401) {
      return res.status(500).json({ error: "Invalid API key" });
    }
    console.error(err.message); 
    res.status(500).json({ error: "Weather service unavailable" });
  }
});

export default router;
