import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";


interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
  nameAndSurname: string;
  company: string;
  sector: string;
  country: string;
  telephone: string;
  email: string;
}

export default function ContactModal({ visible, onClose }: ContactModalProps) {
  const { width, height } = useWindowDimensions();
  const [formData, setFormData] = useState<FormData>({
    nameAndSurname: "",
    company: "",
    sector: "",
    country: "",
    telephone: "",
    email: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      nameAndSurname: "",
      company: "",
      sector: "",
      country: "",
      telephone: "",
      email: "",
    });
    onClose();
  };

  const handleAccept = () => {
    console.log("Form submitted:", formData);
    // TODO: Enviar datos del formulario
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* Bubbles en la esquina inferior izquierda */}
      <Image
        source={require("../../assets/contact/bubbles.png")}
        style={styles.bubbles}
        resizeMode="contain"
      />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.modalContainer, { width: width * 0.7, maxHeight: height * 0.9 }]}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Icono del título */}
                <View style={styles.iconContainer}>
                  <Image
                    source={require("../../assets/contact/titleIcon.png")}
                    style={styles.titleIcon}
                    resizeMode="contain"
                  />
                </View>

                {/* Título */}
                <Text style={styles.title}>Let's talk</Text>

                {/* Descripción */}
                <Text style={styles.description}>
                  Leave us your contact details and we'll send you personalized
                  information about how{" "}
                  <Text style={styles.boldTextColor}>ECOFROG</Text> can help you
                  to clean effectively, safely and{" "}
                  <Text style={styles.boldText}>without chemicals</Text>.
                </Text>

                {/* Formulario */}
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Name and surname</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter.."
                      placeholderTextColor="#999"
                      value={formData.nameAndSurname}
                      onChangeText={(value) =>
                        handleChange("nameAndSurname", value)
                      }
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Company</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter.."
                      placeholderTextColor="#999"
                      value={formData.company}
                      onChangeText={(value) => handleChange("company", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Sector</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter.."
                      placeholderTextColor="#999"
                      value={formData.sector}
                      onChangeText={(value) => handleChange("sector", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Country</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter.."
                      placeholderTextColor="#999"
                      value={formData.country}
                      onChangeText={(value) => handleChange("country", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Telephone</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter.."
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      value={formData.telephone}
                      onChangeText={(value) => handleChange("telephone", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>E-mail</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter.."
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={formData.email}
                      onChangeText={(value) => handleChange("email", value)}
                    />
                  </View>
                </View>

                {/* Botones */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={handleAccept}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  scrollContent: {
    padding: 40,
    alignItems: "center",
  },
  bubbles: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 350,
    height: 350,
    zIndex: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
  titleIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Exo-Medium",
    fontWeight: "500",
    fontSize: 32,
    textAlign: "center",
    color: "#000000",
    marginBottom: 14,
  },
  description: {
    fontFamily: "Exo-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 29,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  boldTextColor: {
    fontFamily: "Exo-ExtraBold",
    fontWeight: "800",
    color: "#00B4D8",
  },
  boldText: {
    fontFamily: "Exo-ExtraBold",
    fontWeight: "800",
    color: "#333",
  },
  form: {
    width: "100%",
    maxWidth: 528,
    gap: 15,
    marginBottom: 30,
    zIndex: 1,
  },
  inputGroup: {
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Exo-Medium",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 18,
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 23,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Exo-Regular",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    width: "100%",
    zIndex: 1,
  },
  cancelButton: {
    width: 168,
    height: 43,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  cancelButtonText: {
    fontFamily: "Exo-Medium",
    fontSize: 16,
    color: "#3498db",
  },
  acceptButton: {
    width: 168,
    height: 43,
    borderRadius: 10,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  acceptButtonText: {
    fontFamily: "Exo-Medium",
    fontSize: 16,
    color: "#fff",
  },
});
