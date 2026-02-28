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
                <X size={28} color="#fff" />
              </TouchableOpacity>

              {videoUrl ? (
                <View style={styles.videoWrapper}>
                  {isVideoLoading && (
                    <View style={styles.loadingOverlay}>
                      <ActivityIndicator size="large" color="#00B4D8" />
                      <Text style={styles.loadingText}>{t("loading.video")}</Text>
                    </View>
                  )}
                  <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    style={[styles.video, isVideoLoading && { opacity: 0 }]}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    onReadyForDisplay={() => setIsVideoLoading(false)}
                    onLoadStart={() => setIsVideoLoading(true)}
                  />
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
    borderRadius: 16,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
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
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
});
