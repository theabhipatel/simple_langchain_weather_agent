import "dotenv/config";
import { ChatOpenRouter } from "@langchain/openrouter";
import { getCordinatesTool } from "./tools/getCordinates.js";
import { getWeatherTool } from "./tools/getWeather.js";
import {
  StateGraph,
  START,
  END,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { ToolNode, toolsCondition } from "@langchain/langgraph/prebuilt";

const model = new ChatOpenRouter({
  model: "nvidia/nemotron-3-super-120b-a12b:free",
  temperature: 0,
  maxTokens: 1024,
});

const modelWithTools = model.bindTools([getCordinatesTool, getWeatherTool]);

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await modelWithTools.invoke(state.messages);

  return {
    messages: [response],
  };
};

const toolNode = new ToolNode([getCordinatesTool, getWeatherTool]);

const graph = new StateGraph(MessagesAnnotation)
  .addNode("llm", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "llm")
  .addConditionalEdges("llm", toolsCondition)
  .addEdge("tools", "llm")
  .compile();

export const langGraphAgent = graph;
