import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { X } from "lucide-react-native";
import { VideoCategory } from "./types";

const { width, height } = Dimensions.get("window");

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
  const videoRef = useRef<Video>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

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
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>{category?.title}</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <X size={28} color="#333" />
                </TouchableOpacity>
              </View>

              {videoUrl ? (
                <View style={styles.videoWrapper}>
                  {isVideoLoading && (
                    <View style={styles.loadingOverlay}>
                      <ActivityIndicator size="large" color="#00B4D8" />
                      <Text style={styles.loadingText}>Cargando video...</Text>
                    </View>
                  )}
                  <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    style={[styles.video, isVideoLoading && { opacity: 0 }]}
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    onReadyForDisplay={() => setIsVideoLoading(false)}
                    onLoadStart={() => setIsVideoLoading(true)}
                  />
                </View>
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#00B4D8" />
                  <Text style={styles.loadingText}>Cargando video...</Text>
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
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  closeButton: {
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
