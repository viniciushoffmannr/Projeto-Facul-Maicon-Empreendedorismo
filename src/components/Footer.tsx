import {
  Home as HomeIcon,
  CalendarDays as AgendaIcon,
  Camera as CameraIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#fdf5e6] border-t border-gray-300 shadow-md z-50">
      <div className="flex h-16">

        <button
          onClick={() => navigate("/home")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition"
        >
          <HomeIcon size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Início</span>
        </button>

        <button
          onClick={() => navigate("/agenda")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition"
        >
          <AgendaIcon size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Agenda</span>
        </button>

        <button
          onClick={() => navigate("/monitoramento")}
          className="flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition"
        >
          <CameraIcon size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Monitoramento</span>
        </button>

      </div>
    </footer>
  );
};

export default Footer;
