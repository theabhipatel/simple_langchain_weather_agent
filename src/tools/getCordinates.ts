

import { tool } from "langchain";
import * as z from "zod";

export const getCordinatesTool = tool(async ({ city }) => {

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

        const res = await fetch(url)
        const data = await res.json() as any

        return JSON.stringify({
            name: data.results[0].name,
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude
        })

    } catch (error) {
        console.log("❌ getCordinatesTool error : ")
        throw new Error("Failed to get result from getCordinatesTool")
    }

}, {
    name: "get_cordinate_tool",
    description: "Get the cordinates (latitue and longitude) for a city",
    schema: z.object({ city: z.string() }),
});

// https://geocoding-api.open-meteo.com/v1/search?name=Mumbai&count=1
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m