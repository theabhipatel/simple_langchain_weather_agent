import express from "express";
import { agent } from "./agent.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3211;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the Simple Langchain Agent" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMessages = req.body;
    console.log("userMessages ==> ", userMessages);

    const result = await agent.invoke({
      messages: userMessages,
    });

    // console.log("result => ", result.messages)
    const messages = result.messages;
    const lastMessage = messages[messages.length - 1];

    console.log("Ai Reply => ", lastMessage?.content);

    res.status(200).json({
      success: true,
      message: "Chat return succesfully",
      content: lastMessage?.content,
    });
  } catch (error) {
    console.log("error :=> ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. You went into unknown digital realm.",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
