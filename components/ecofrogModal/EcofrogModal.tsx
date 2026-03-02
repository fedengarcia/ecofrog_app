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
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

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
                  <ArrowLeft size={moderateScale(30, 0.3)} color="#49454F" />
                </TouchableOpacity>
              )}

              {/* Flecha derecha */}
              {currentPage < TOTAL_PAGES - 1 && (
                <TouchableOpacity
                  style={styles.arrowRight}
                  onPress={goToNextPage}
                >
                  <ArrowRight size={moderateScale(30, 0.3)} color="#49454F" />
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
    borderRadius: moderateScale(20, 0.5),
    padding: scale(50),
    paddingTop: verticalScale(30),
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: verticalScale(15),
    right: scale(15),
    zIndex: 10,
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20, 0.5),
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: moderateScale(24, 0.3),
    color: "#333",
    fontWeight: "bold",
  },
  arrowLeft: {
    position: "absolute",
    left: scale(15),
    top: "50%",
    zIndex: 10,
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(25, 0.5),
    borderColor: "#49454F",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRight: {
    position: "absolute",
    right: scale(15),
    top: "50%",
    zIndex: 10,
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(25, 0.5),
    borderColor: "#49454F",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
