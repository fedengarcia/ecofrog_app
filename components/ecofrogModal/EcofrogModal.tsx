import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface EcofrogModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function EcofrogModal({ visible, onClose }: EcofrogModalProps) {
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

              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Logo */}
                <Image
                  source={require("../../assets/ecofrogLogo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />

                {/* Título */}
                <Text style={styles.title}>About EcoFrog</Text>

                {/* Descripción */}
                <Text style={styles.description}>
                  <Text style={styles.boldTextColor}>ECOFROG</Text> is an
                  innovative cleaning solution that provides effective, safe,
                  and <Text style={styles.boldText}>chemical-free</Text>{" "}
                  cleaning for various applications.
                </Text>

                <Text style={styles.description}>
                  Our products use advanced technology to deliver superior
                  cleaning results while being environmentally friendly and safe
                  for users.
                </Text>

                <Text style={styles.description}>
                  Discover our range of products designed to meet your cleaning
                  needs in industrial, commercial, and residential settings.
                </Text>

                {/* Botón de cerrar */}
                <TouchableOpacity
                  style={styles.closeButtonBottom}
                  onPress={onClose}
                >
                  <Text style={styles.closeButtonBottomText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
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
    width: width * 0.6,
    maxHeight: height * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
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
  scrollContent: {
    paddingTop: 20,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8D418F",
    marginBottom: 20,
    fontFamily: "Exo-Bold",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    fontFamily: "Exo-Regular",
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  boldText: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  boldTextColor: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
    color: "#8D418F",
  },
  closeButtonBottom: {
    backgroundColor: "#8D418F",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonBottomText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
});
