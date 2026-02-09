// Ejemplo de cómo usar el contexto de inactividad en tus componentes

import { useInactivity } from "../context/InactivityContext";

function MiComponenteConVideo() {
  const { setIsVideoPlaying, resetInactivityTimer } = useInactivity();

  const handleStartVideo = async () => {
    // Desactivar el sleep mientras se reproduce el video
    setIsVideoPlaying(true);
    // Reproducir tu video...
  };

  const handleStopVideo = async () => {
    // Reactivar el sleep cuando termine el video
    setIsVideoPlaying(false);
  };

  const handleUserTouch = () => {
    // Reiniciar el timer de inactividad al tocar
    resetInactivityTimer();
  };

  return (
    // Tu componente aquí
    null
  );
}

export default MiComponenteConVideo;
