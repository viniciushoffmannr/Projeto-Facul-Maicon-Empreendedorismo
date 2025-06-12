import {
  Home as HomeIcon,
  CalendarDays as AgendaIcon,
  Camera as CameraIcon,
  MessageCircle as MessageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#fdf5e6] border-t border-gray-300 shadow-md z-50 px-4">
      {/* Padding no footer para as bordas */}

      <div className="flex h-16">
        <button
          onClick={() => navigate("/home")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition gap-1"
        >
          <HomeIcon size={24} strokeWidth={1.5} />
          <span className="text-xs leading-none">Início</span>
        </button>

        <button
          onClick={() => navigate("/agenda")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition gap-1"
        >
          <AgendaIcon size={24} strokeWidth={1.5} />
          <span className="text-xs leading-none">Agenda</span>
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition gap-1"
        >
          <MessageIcon size={24} strokeWidth={1.5} />
          <span className="text-xs leading-none">Chat</span>
        </button>

        <button
          onClick={() => navigate("/monitoramento")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition gap-1"
        >
          <CameraIcon size={24} strokeWidth={1.5} />
          <span className="text-xs leading-none">Monitoramento</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
