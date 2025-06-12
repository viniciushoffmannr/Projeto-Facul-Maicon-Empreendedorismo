import React, { useState } from "react";
import { Camera as CameraIcon } from "lucide-react";

const Monitoramento: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 p-4 pt-6">
      {/* Câmeras */}
      <div className="grid grid-cols-2 gap-6 mb-8 justify-center max-w-xl mx-auto">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex flex-col items-center">
            <div className="w-36 h-28 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gray-700">
              <CameraIcon size={48} color="white" />
            </div>
            <span className="mt-2 font-semibold text-gray-700">{`Câmera ${num}`}</span>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-grow border border-gray-300 rounded-lg bg-white shadow-md p-4 max-w-xl mx-auto">
        <div className="flex-grow overflow-y-auto mb-4 max-h-72">
          {messages.length === 0 ? (
            <p className="text-gray-400 italic text-center mt-8">
              Nenhuma mensagem ainda...
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-blue-100 text-blue-900 rounded-lg px-3 py-2 mb-2 max-w-[80%] break-words"
              >
                {msg}
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded transition"
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Espaço para o footer */}
      <div className="h-20" />
    </div>
  );
};

export default Monitoramento;
