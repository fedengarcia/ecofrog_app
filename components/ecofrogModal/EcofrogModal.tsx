import React from "react";
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
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

const { width, height } = Dimensions.get("window");

interface EcofrogModalProps {
  visible: boolean;
  onClose: () => void;
  isH2O3?: boolean;
}

export default function EcofrogModal({
  visible,
  onClose,
  isH2O3 = false,
}: EcofrogModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              {/* Botón de cerrar */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {/* Contenido según tipo */}
              {isH2O3 ? <EcofrogPage2 /> : <EcofrogPage1 />}
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
    height: height * 0.85,
    backgroundColor: "#fff",
    borderRadius: moderateScale(20, 0.5),
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(20),
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
});
