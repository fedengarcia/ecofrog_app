import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import EcofrogPage1 from "./EcofrogPage1";
import EcofrogPage2 from "./EcofrogPage2";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

interface EcofrogModalProps {
  visible: boolean;
  onClose: () => void;
}

const TOTAL_PAGES = 2;

export default function EcofrogModal({ visible, onClose }: EcofrogModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
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
              {/* Botón de cerrar */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {/* Flecha izquierda */}
              {currentPage > 0 && (
                <TouchableOpacity
                  style={styles.arrowLeft}
                  onPress={goToPrevPage}
                >
                  <ArrowLeft size={30} color="#49454F" />
                </TouchableOpacity>
              )}

              {/* Flecha derecha */}
              {currentPage < TOTAL_PAGES - 1 && (
                <TouchableOpacity
                  style={styles.arrowRight}
                  onPress={goToNextPage}
                >
                  <ArrowRight size={30} color="#49454F" />
                </TouchableOpacity>
              )}

              {/* Contenido de la página */}
              {currentPage === 0 ? <EcofrogPage1 /> : <EcofrogPage2 />}
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    maxHeight: height * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 50,
    paddingTop: 30,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  arrowLeft: {
    position: "absolute",
    left: 15,
    top: "50%",
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#49454F",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRight: {
    position: "absolute",
    right: 15,
    top: "50%",
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#49454F",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
