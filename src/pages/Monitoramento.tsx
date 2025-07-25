import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<
    { text: string; sender: "outro" | "eu" }[]
  >([{ text: "Olá, tudo bem?", sender: "outro" }]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setMessages((prev) => [...prev, { text: trimmed, sender: "eu" }]);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="mt-10 px-4">
      <div className="flex flex-col flex-grow border border-gray-300 rounded-lg bg-white shadow-md p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-500 text-center mb-4">
          Chat
        </h2>

        <div className="flex-grow overflow-y-auto mb-4 max-h-72">
          {messages.length === 0 ? (
            <p className="text-gray-400 italic text-center mt-8">
              Nenhuma mensagem ainda...
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 mb-2 max-w-[80%] rounded-lg break-words ${
                  msg.sender === "eu"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-blue-500 text-white ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite sua mensagem"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
