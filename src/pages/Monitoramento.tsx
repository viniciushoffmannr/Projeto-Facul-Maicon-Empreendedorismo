import React, { useState, useEffect } from "react";
import { Camera as CameraIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SecurityCameraVideo: React.FC<{ src: string }> = ({ src }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700 bg-black">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 touch-none select-none"
      />

      {/* Texto "REC" piscando */}
      <div className="absolute top-2 left-2 text-red-600 font-mono text-sm animate-pulse">
        REC
      </div>

      {/* Data e hora */}
      <div className="absolute bottom-2 left-2 text-white font-mono text-xs bg-black bg-opacity-50 rounded px-1">
        {formatDate(time)} {formatTime(time)}
      </div>

      {/* Overlay de ruído */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://media.giphy.com/media/xUOxf48wZPXI62DG7y/giphy.gif')",
          opacity: 0.1,
          mixBlendMode: "overlay",
          filter: "grayscale(100%)",
        }}
      />
    </div>
  );
};

const Monitoramento: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);

  const cameras = [1, 2, 3, 4];

  return (
    <div className="relative flex flex-col min-h-screen bg-blue-50 p-4 pt-6">
      {/* Grade de câmeras */}
      <div className="grid grid-cols-2 gap-6 mb-8 justify-center max-w-xl mx-auto">
        {cameras.map((num) => (
          <div
            key={num}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedCamera(num)}
          >
            <div className="w-36 h-28 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gray-700">
              <CameraIcon size={48} color="white" />
            </div>
            <span className="mt-2 font-semibold text-gray-700">{`Câmera ${num}`}</span>
          </div>
        ))}
      </div>

      {/* Visualização da câmera expandida */}
      <AnimatePresence>
        {selectedCamera !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl p-4 w-[90%] max-w-2xl border border-gray-300"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedCamera(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              >
                <CloseIcon size={24} />
              </button>
              <h2 className="text-gray-800 text-lg mb-3 font-semibold">{`Câmera ${selectedCamera}`}</h2>

              <SecurityCameraVideo src="/videos/crianc.mp4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-20" />
    </div>
  );
};

export default Monitoramento;
