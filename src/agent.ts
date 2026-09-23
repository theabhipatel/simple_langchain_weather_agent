import "dotenv/config"
import { ChatOpenRouter } from "@langchain/openrouter";
import { createAgent } from "langchain";
import { getCordinatesTool } from "./tools/getCordinates.js";
import { getWeatherTool } from "./tools/getWeather.js";


const model = new ChatOpenRouter({
    model: "nvidia/nemotron-3-super-120b-a12b:free",
    temperature: 0,
    maxTokens: 1024,
});


const agent = createAgent({
    model,
    tools: [getCordinatesTool, getWeatherTool],
    systemPrompt: "You are a helpful assistant. Be concise and accurate.",
});

const result = await agent.invoke({
    messages: [
        { role: "user", content: "Give me weather for Indore" }
    ]
})

// console.log("result => ", result.messages)
const messages = result.messages
const lastMessage = messages[messages.length -1]


console.log("Ai Reply => ", lastMessage?.content)