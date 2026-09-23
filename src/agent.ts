import "dotenv/config";
import { ChatOpenRouter } from "@langchain/openrouter";
import { createAgent } from "langchain";
import { getCordinatesTool } from "./tools/getCordinates.js";
import { getWeatherTool } from "./tools/getWeather.js";

const model = new ChatOpenRouter({
  model: "nvidia/nemotron-3-super-120b-a12b:free",
  temperature: 0,
  maxTokens: 1024,
});

export const agent = createAgent({
  model,
  tools: [getCordinatesTool, getWeatherTool],
  systemPrompt: "You are a helpful assistant. Be concise and accurate.",
});
