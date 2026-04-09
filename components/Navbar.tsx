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
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import { ArrowLeftCircle } from "lucide-react-native";

// Importar imágenes
const productsIcon = require("../assets/navbar/product.png");
const informationIcon = require("../assets/navbar/information.png");
const contactIcon = require("../assets/navbar/mail.png");

type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NavbarOption {
  id: string;
  label: string;
  screen: string | null;
  onClick: () => void;
  icon: ImageSourcePropType | React.ReactNode;
}

export default function Navbar() {
  const navigation = useNavigation<NavbarNavigationProp>();
  const { openContactModal, openEcofrogModal, openH2O3Modal } = useModal();
  const { t } = useTranslation("common");

  const NAVBAR_OPTIONS: NavbarOption[] = [
    {
      id: "",
      label: "",
      screen: "Home",
      onClick: () => navigation.goBack(),
      icon: <ArrowLeftCircle color="#3498db" size={34} />,
    },
    {
      id: "products",
      label: t("navbar.products"),
      screen: "Productos",
      onClick: () => navigation.navigate("Productos"),
      icon: productsIcon,
    },
    {
      id: "H₂O + O₃",
      label: "💧 Ozono",
      screen: null,
      onClick: openH2O3Modal,
      icon: null,
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
                ...(option.id !== "" ? styles.navbarOptionButton : {}),
              }}
            >
              {option.icon === null ? (
                <></>
              ) : React.isValidElement(option.icon) ? (
                option.icon
              ) : (
                <Image
                  source={option.icon as ImageSourcePropType}
                  style={[styles.icon, { tintColor: "#fff" }]}
                />
              )}
              <Text
                style={{
                  ...styles.navbarOptionText,
                  ...(option.id !== "" ? styles.navbarOptionTextButton : {}),
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
    height: verticalScale(91),
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
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
    gap: scale(5),
  },
  navbarOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(8),
    gap: scale(8),
  },
  navbarOptionButton: {
    backgroundColor: "#3498db",
    borderRadius: moderateScale(8, 0.5),
  },
  navbarOptionText: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: "500",
    fontFamily: "Exo-Medium",
    color: "#3498db",
  },
  navbarOptionTextButton: {
    color: "#fff",
  },
  logo: {
    width: scale(70),
    height: scale(70),
    resizeMode: "contain",
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
});
