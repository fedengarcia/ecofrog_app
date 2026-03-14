import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Video, ResizeMode } from "expo-av";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { NavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

const INACTIVITY_TIMEOUT = 99999999; // 30 segundos

interface InactivityContextType {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  resetInactivityTimer: () => void;
  showSleepBackground: boolean;
  setNavigationRef: (
    ref: NavigationContainerRef<RootStackParamList> | null,
  ) => void;
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
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList> | null>(null);
  const showSleepRef = useRef(false);
  const isVideoPlayingRef = useRef(false);

  // Mantener refs sincronizados con el estado
  useEffect(() => {
    showSleepRef.current = showSleepBackground;
  }, [showSleepBackground]);

  useEffect(() => {
    isVideoPlayingRef.current = isVideoPlaying;
  }, [isVideoPlaying]);

  // Gestionar el timer cuando cambia el estado de video
  useEffect(() => {
    if (isVideoPlaying) {
      // Video reproduciéndose — pausar el timer de inactividad
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = null;
      }
    } else if (!showSleepBackground) {
      // Video detenido y no estamos en sleep — reiniciar el timer
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      inactivityTimer.current = setTimeout(() => {
        setShowSleepBackground(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [isVideoPlaying, showSleepBackground]);

  const setNavigationRef = (
    ref: NavigationContainerRef<RootStackParamList> | null,
  ) => {
    navigationRef.current = ref;
  };

  // Resetear el timer de inactividad
  const resetInactivityTimer = useCallback(() => {
    // Si estamos en modo sleep, salir de él y volver a Home
    if (showSleepRef.current) {
      setShowSleepBackground(false);
      videoRef.current?.pauseAsync();

      // Navegar a Home después de salir del sleep
      if (navigationRef.current?.isReady()) {
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    }

    // Limpiar el timer anterior
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Solo iniciar el timer si no hay video reproduciéndose
    if (!isVideoPlayingRef.current) {
      inactivityTimer.current = setTimeout(() => {
        setShowSleepBackground(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, []);

  useEffect(() => {
    // Iniciar el timer al montar el componente
    resetInactivityTimer();

    // Limpiar al desmontar
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetInactivityTimer]);

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
    setNavigationRef,
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
