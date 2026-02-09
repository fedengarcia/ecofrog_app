import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Video, ResizeMode } from "expo-av";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

const INACTIVITY_TIMEOUT = 15000; // 15 segundos

interface InactivityContextType {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  resetInactivityTimer: () => void;
  showSleepBackground: boolean;
}

const InactivityContext = createContext<InactivityContextType | undefined>(
  undefined,
);

export const useInactivity = () => {
  const context = useContext(InactivityContext);
  if (!context) {
    throw new Error("useInactivity debe usarse dentro de InactivityProvider");
  }
  return context;
};

interface InactivityProviderProps {
  children: ReactNode;
}

export const InactivityProvider: React.FC<InactivityProviderProps> = ({
  children,
}) => {
  const [showSleepBackground, setShowSleepBackground] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<Video>(null);

  // Resetear el timer de inactividad
  const resetInactivityTimer = () => {
    // Si estamos en modo sleep, salir de él
    if (showSleepBackground) {
      setShowSleepBackground(false);
      videoRef.current?.pauseAsync();
    }

    // Limpiar el timer anterior
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Solo iniciar el timer si no hay video reproduciéndose
    if (!isVideoPlaying) {
      inactivityTimer.current = setTimeout(() => {
        setShowSleepBackground(true);
      }, INACTIVITY_TIMEOUT);
    }
  };

  useEffect(() => {
    // Iniciar el timer al montar el componente
    resetInactivityTimer();

    // Limpiar al desmontar
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [isVideoPlaying]);

  // Reproducir el video cuando se muestre el sleep background
  useEffect(() => {
    if (showSleepBackground) {
      videoRef.current?.playAsync();
    }
  }, [showSleepBackground]);

  const value: InactivityContextType = {
    isVideoPlaying,
    setIsVideoPlaying,
    resetInactivityTimer,
    showSleepBackground,
  };

  return (
    <InactivityContext.Provider value={value}>
      {children}
      {showSleepBackground && (
        <TouchableWithoutFeedback onPress={resetInactivityTimer}>
          <View style={styles.sleepContainer}>
            <Video
              ref={videoRef}
              source={require("../assets/sleep_background.mp4")}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </InactivityContext.Provider>
  );
};

const styles = StyleSheet.create({
  sleepContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
