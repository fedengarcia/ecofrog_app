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
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  localidad: string;
  atendio_asesor: string;
}

export default function ContactModal({ visible, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    localidad: "",
    atendio_asesor: "",
  });
  const [publicidad, setPublicidad] = useState(false);
  const [privacidad, setPrivacidad] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation("contact");

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      localidad: "",
      atendio_asesor: "",
    });
    setPublicidad(false);
    setPrivacidad(false);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleAccept = async () => {
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.telefono ||
      !formData.localidad
    ) {
      Alert.alert(t("alerts.errorTitle"), t("alerts.errorEmpty"));
      return;
    }

    if (!privacidad) {
      Alert.alert(t("alerts.errorTitle"), t("alerts.errorPrivacy"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://servipro.odoo.com/contact-form-webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer lCfPycGU7treH6K1F1SY",
          },
          body: JSON.stringify({
            form_data: {
              nombre: formData.nombre,
              email: formData.email,
              telefono: formData.telefono,
              localidad: formData.localidad,
              atendio_asesor: formData.atendio_asesor || "ninguno",
              politicaprivacidad: privacidad,
              publicidad: publicidad,
              url: "https://www.ecofrog.es",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      Alert.alert(t("alerts.successTitle"), t("alerts.successMessage"));
      resetForm();
      onClose();
    } catch (error) {
      Alert.alert(t("alerts.errorTitle"), t("alerts.errorSend"));
    } finally {
      setIsSubmitting(false);
    }
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
            <View style={styles.modalContainer}>
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
                <Text style={styles.title}>{t("title")}</Text>

                {/* Descripción */}
                <Text style={styles.description}>
                  {t("description")}
                  <Text style={styles.boldTextColor}>
                    {t("descriptionBrand")}
                  </Text>
                  {t("descriptionMiddle")}
                  <Text style={styles.boldText}>{t("descriptionBold")}</Text>
                  {t("descriptionEnd")}
                </Text>

                {/* Formulario */}
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{t("fields.name")}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={t("fields.placeholder")}
                      placeholderTextColor="#999"
                      value={formData.nombre}
                      onChangeText={(value) => handleChange("nombre", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{t("fields.email")}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={t("fields.placeholder")}
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={formData.email}
                      onChangeText={(value) => handleChange("email", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {t("fields.telephone")}
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder={t("fields.telephonePlaceholder")}
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      value={formData.telefono}
                      onChangeText={(value) => handleChange("telefono", value)}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {t("fields.location")}
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder={t("fields.placeholder")}
                      placeholderTextColor="#999"
                      value={formData.localidad}
                      onChangeText={(value) =>
                        handleChange("localidad", value)
                      }
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {t("fields.advisor")}
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder={t("fields.placeholder")}
                      placeholderTextColor="#999"
                      value={formData.atendio_asesor}
                      onChangeText={(value) =>
                        handleChange("atendio_asesor", value)
                      }
                    />
                  </View>
                </View>

                {/* Checkboxes */}
                <View style={styles.checkboxesContainer}>
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setPublicidad(!publicidad)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        publicidad && styles.checkboxChecked,
                      ]}
                    >
                      {publicidad && (
                        <Text style={styles.checkmark}>&#10003;</Text>
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      {t("checkboxes.publicidad")}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.checkboxRow}>
                    <TouchableOpacity
                      onPress={() => setPrivacidad(!privacidad)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          privacidad && styles.checkboxChecked,
                        ]}
                      >
                        {privacidad && (
                          <Text style={styles.checkmark}>&#10003;</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>
                      {t("checkboxes.privacidad")}
                      <Text
                        style={styles.privacyLink}
                        onPress={() =>
                          Linking.openURL(
                            "https://www.ecofrog.es/politica-privacidad/"
                          )
                        }
                      >
                        {t("checkboxes.privacidadLink")}
                      </Text>
                      .
                    </Text>
                  </View>
                </View>

                {/* Botones */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>
                      {t("buttons.cancel")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.acceptButton,
                      isSubmitting && { opacity: 0.6 },
                    ]}
                    onPress={handleAccept}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.acceptButtonText}>
                        {t("buttons.accept")}
                      </Text>
                    )}
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
    width: width * 0.7,
    maxHeight: height * 0.9,
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
    marginBottom: 20,
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
  checkboxesContainer: {
    width: "100%",
    maxWidth: 528,
    gap: 12,
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  privacyLink: {
    color: "#3498db",
    textDecorationLine: "underline",
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
