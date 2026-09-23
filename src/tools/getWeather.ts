import { tool } from "langchain";
import * as z from "zod";

export const getWeatherTool = tool(
  async ({ latitude, longitude }) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

      const res = await fetch(url);
      const data = await res.json() as any

      return JSON.stringify({
        current_units: data.current_units,
        current: data.current,
      });
    } catch (error) {
      console.log("❌ getWeatherTool error : ");
      throw new Error("Failed to get result from getWeatherTool");
    }
  },
  {
    name: "get_weather_tool",
    description:
      "Get the Weather for a city by latitue and longitude and if you don't have latitue and longitude please use this get_cordinate_tool and then call this tool",
    schema: z.object({ latitude: z.string(), longitude: z.string() }),
  },
);

// https://geocoding-api.open-meteo.com/v1/search?name=Mumbai&count=1
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m
