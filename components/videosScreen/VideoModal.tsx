import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { X } from "lucide-react-native";
import { VideoCategory } from "./types";
import { useTranslation } from "react-i18next";
import { scale, verticalScale, moderateScale } from "../../utils/scaling";
import { useInactivity } from "../../context/InactivityContext";

interface VideoModalProps {
  visible: boolean;
  videoUrl: string | null;
  category: VideoCategory | null;
  onClose: () => void;
}

export default function VideoModal({
  visible,
  videoUrl,
  category,
  onClose,
}: VideoModalProps) {
  const { t } = useTranslation("common");
  const { width, height } = useWindowDimensions();
  const videoRef = useRef<Video>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const { setIsVideoPlaying } = useInactivity();

  // Señalizar al contexto de inactividad cuando hay video reproduciéndose
  useEffect(() => {
    setIsVideoPlaying(visible && !!videoUrl);
    return () => setIsVideoPlaying(false);
  }, [visible, videoUrl]);

  // Calcular dimensiones del modal manteniendo aspect ratio 9:16
  const maxHeight = height * 0.9;
  const maxWidth = width * 0.9;
  // 9:16 significa: width/height = 9/16, entonces height = width * (16/9)
  const aspectRatio = 9 / 16;

  let modalWidth = maxWidth;
  let modalHeight = modalWidth / aspectRatio; // altura basada en el ancho

  // Si la altura calculada excede el máximo, ajustar basándose en la altura
  if (modalHeight > maxHeight) {
    modalHeight = maxHeight;
    modalWidth = modalHeight * aspectRatio;
  }

  // Resetear estado de carga cuando cambia el video o cuando el modal se abre
  useEffect(() => {
    if (visible && videoUrl) {
      setIsVideoLoading(true);
    }
  }, [visible, videoUrl]);

  const handleClose = async () => {
    if (videoRef.current) {
      await videoRef.current.stopAsync();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={[
                styles.modalContainer,
                { width: modalWidth, height: modalHeight },
              ]}
            >
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <X size={moderateScale(28, 0.3)} color="#fff" />
              </TouchableOpacity>

              {videoUrl ? (
                <View style={styles.videoWrapper}>
                  <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    onReadyForDisplay={() => setIsVideoLoading(false)}
                    onLoadStart={() => setIsVideoLoading(true)}
                  />
                  {isVideoLoading && (
                    <View style={styles.loadingOverlay}>
                      <ActivityIndicator size="large" color="#00B4D8" />
                      <Text style={styles.loadingText}>{t("loading.video")}</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#00B4D8" />
                  <Text style={styles.loadingText}>{t("loading.video")}</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#000",
    borderRadius: moderateScale(16, 0.5),
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: verticalScale(12),
    right: scale(12),
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: moderateScale(20, 0.5),
    padding: scale(8),
  },
  videoWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 10,
    elevation: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    fontSize: moderateScale(16, 0.3),
    color: "#666",
    marginTop: verticalScale(12),
  },
});
