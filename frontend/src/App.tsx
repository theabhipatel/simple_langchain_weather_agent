import { useState } from "react";

type TRoles = "user" | "assistant";

interface IMessage {
  role: TRoles;
  content: string;
}

const temp: IMessage[] = [
  {
    role: "user",
    content: "Hi there",
  },
  {
    role: "assistant",
    content: "Hello, How i can help you.",
  },
];

const baseURl = "http://localhost:3211/api";

const App = () => {
  const [newUserMessage, setNewUserMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: any) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { role: "user", content: newUserMessage }]);
    const newMessage = [...messages, { role: "user", content: newUserMessage }];
    setNewUserMessage("");
    setLoading(true);
    try {
      const res = await fetch(`${baseURl}/chat`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      const data = await res.json();
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col">
      <div className="w-full h-full flex justify-center py-5 overflow-y-auto mb-10">
        <div className="w-[60%]  flex flex-col gap-2 text-white mb-10 ">
          {messages.map((msg) => {
            if (msg.role === "user") {
              return (
                <div className="self-end bg-blue-700/50 p-2 rounded-2xl min-w-20 max-w-[70%]">
                  {msg.content}
                </div>
              );
            } else {
              return (
                <div className="self-start bg-gray-700/60 p-2 rounded-2xl min-w-20 max-w-[70%]">
                  {msg.content}
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="w-full flex justify-center ">
        <form
          onSubmit={handleSend}
          className="w-[60%] min-h-12 border border-gray-500/50 rounded-2xl flex"
        >
          <input
            value={newUserMessage}
            onChange={(e) => setNewUserMessage(e.target.value)}
            className="w-full outline-0 text-white text-xl px-3 py-2"
          ></input>
          <button
            type="submit"
            disabled={loading}
            className="px-10 bg-blue-950 text-white rounded-2xl"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
