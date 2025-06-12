import React from "react";
import userPhoto from "../assets/perfil-sem.jpg";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  description: string;
  photoUrl: string;
};

const Home: React.FC = () => {
  const user: User = {
    name: "João da Silva",
    description:
      "Resposável",
    photoUrl: userPhoto, // substitua pela URL real
  };

  const navigate = useNavigate();

  const userName = JSON.parse(localStorage.getItem("user")!).username;

  const handleAgendaClick = () => {
    navigate("/agenda");
  };

  const handleCamClick = () => {
    navigate("/monitoramento");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-md mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.photoUrl}
            alt="Foto do usuário"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{userName}</h1>
            <p className="text-sm text-gray-600">{user.description}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={handleAgendaClick}
          className="w-full bg-[#fdf5e6] text-blue-600 py-3 border border-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Agenda
        </button>
        <button
          onClick={handleChatClick}
          className="w-full bg-[#fdf5e6] text-blue-600 border border-blue-600 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Chat
        </button>
        <button
          onClick={handleCamClick}
          className="w-full bg-[#fdf5e6] text-blue-600 border border-blue-600 py-3 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Câmeras
        </button>
      </div>
    </div>
  );
};

export default Home;
