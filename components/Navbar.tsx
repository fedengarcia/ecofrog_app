import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useModal } from "../context/ModalContext";
import { useTranslation } from "react-i18next";

// Importar imágenes
const arrowBackIcon = require("../assets/navbar/arrowBack.png");
const productsIcon = require("../assets/navbar/product.png");
const informationIcon = require("../assets/navbar/information.png");
const contactIcon = require("../assets/navbar/mail.png");

type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NavbarOption {
  id: string;
  label: string;
  screen: string | null;
  onClick: () => void;
  icon: ImageSourcePropType;
}

export default function Navbar() {
  const navigation = useNavigation<NavbarNavigationProp>();
  const { openContactModal, openEcofrogModal } = useModal();
  const { t } = useTranslation("common");

  const NAVBAR_OPTIONS: NavbarOption[] = [
    {
      id: "back",
      label: t("navbar.back"),
      screen: "Home",
      onClick: () => navigation.goBack(),
      icon: arrowBackIcon,
    },
    {
      id: "products",
      label: t("navbar.products"),
      screen: "Productos",
      onClick: () => navigation.navigate("Productos"),
      icon: productsIcon,
    },
    {
      id: "ecofrog",
      label: t("navbar.ecofrog"),
      screen: null,
      onClick: openEcofrogModal,
      icon: informationIcon,
    },
    {
      id: "contact",
      label: t("navbar.contact"),
      screen: null,
      onClick: openContactModal,
      icon: contactIcon,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </Pressable>
        <View style={styles.menuContainer}>
          {NAVBAR_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              onPress={option.onClick}
              style={{
                ...styles.navbarOption,
                ...(option.id === "contact"
                  ? styles.navbarOptionButton
                  : {}),
              }}
            >
              <Image source={option.icon} style={styles.icon} />
              <Text
                style={{
                  ...styles.navbarOptionText,
                  ...(option.id === "contact"
                    ? styles.navbarOptionTextButton
                    : {}),
                  ...(option.id === "ecofrog"
                    ? {
                        textTransform: "uppercase",
                      }
                    : {}),
                }}
                onPress={option.onClick}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 91,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // Shadow para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // Shadow para Android
    elevation: 15,
    zIndex: 100,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  navbarOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  navbarOptionButton: {
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  navbarOptionText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Exo-Medium",
    color: "#3498db",
  },
  navbarOptionTextButton: {
    color: "#fff",
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
