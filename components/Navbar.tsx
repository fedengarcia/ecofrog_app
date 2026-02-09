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

// Importar imágenes
const arrowBackIcon = require("../assets/navbar/arrowBack.png");
const productsIcon = require("../assets/navbar/product.png");
const informationIcon = require("../assets/navbar/information.png");
const contactIcon = require("../assets/navbar/mail.png");

type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NavbarOption {
  label: string;
  screen: string | null;
  onClick: () => void;
  icon: ImageSourcePropType;
}

export default function Navbar() {
  const navigation = useNavigation<NavbarNavigationProp>();
  const [openModalEcoFrog, setOpenModalEcoFrog] = React.useState(false);
  const [openModalContact, setOpenModalContact] = React.useState(false);

  const NAVBAR_OPTIONS: NavbarOption[] = [
    {
      label: "Back",
      screen: "Home",
      onClick: () => navigation.navigate("Home"),
      icon: arrowBackIcon,
    },
    {
      label: "Products",
      screen: "Products",
      onClick: () => console.log("Products button clicked"),
      icon: productsIcon,
    },
    {
      label: "EcoFrog",
      screen: null,
      onClick: () => setOpenModalEcoFrog(true),
      icon: informationIcon,
    },
    {
      label: "Contact",
      screen: null,
      onClick: () => setOpenModalContact(true),
      icon: contactIcon,
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.menuContainer}>
        {NAVBAR_OPTIONS.map((option) => (
          <Pressable
            key={option.label}
            onPress={option.onClick}
            style={{
              ...styles.navbarOption,
              ...(option.label === "Contact" ? styles.navbarOptionButton : {}),
            }}
          >
            <Image source={option.icon} style={styles.icon} />
            <Text
              style={{
                ...styles.navbarOptionText,
                ...(option.label === "Contact"
                  ? styles.navbarOptionTextButton
                  : {}),
                ...(option.label === "EcoFrog"
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
