import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useInactivity } from "../context/InactivityContext";
import { useTranslation } from "react-i18next";
import IconsBottomContainer from "../components/IconsBottomContainer";
import LanguageDropdown from "../components/LanguageDropdown";
import { scale, verticalScale, moderateScale } from "../utils/scaling";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { resetInactivityTimer } = useInactivity();
  const { t } = useTranslation("home");

  const handleStartTour = () => {
    resetInactivityTimer();
    navigation.navigate("Videos");
  };

  return (
    <View style={styles.container} onTouchStart={resetInactivityTimer}>
      {/* Background Frog Image */}
      <Image
        source={require("../assets/home/frogBackgroundHome.png")}
        style={styles.backgroundFrog}
        resizeMode="contain"
      />

      {/* Language Dropdown */}
      <LanguageDropdown />

      {/* Logo */}
      <Image
        source={require("../assets/ecofrogLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.content}>
        {/* Tagline */}
        <Text style={styles.tagline}>
          {t("tagline")}
          <Text style={styles.taglineHighlight}>{t("taglineHighlight")}</Text>
        </Text>

        {/* Start Tour Button */}
        <TouchableOpacity style={styles.button} onPress={handleStartTour}>
          <Text style={styles.buttonText}>{t("startTour")}</Text>
        </TouchableOpacity>
      </View>

      {/* Eco Message */}
      <View style={styles.ecoMessage}>
        <IconsBottomContainer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: scale(20),
  },
  backgroundFrog: {
    position: "absolute",
    bottom: -350,
    left: -380,
    width: scale(1250),
    height: scale(1250),
    opacity: 1,
  },
  logo: {
    marginTop: verticalScale(240),
    flex: 1,
    width: scale(700),
    height: verticalScale(280),
  },
  content: {
    flex: 1,
    marginTop: verticalScale(40),
    alignItems: "center",
    justifyContent: "space-around",
  },
  tagline: {
    flex: 1,
    width: scale(650),
    fontFamily: "Exo-Regular",
    fontSize: moderateScale(34, 0.3),
    lineHeight: moderateScale(42, 0.3),
    textAlign: "center",
    color: "#000",
    marginBottom: verticalScale(40),
    paddingHorizontal: scale(20),
  },
  taglineHighlight: {
    fontFamily: "Exo-Bold",
    fontSize: moderateScale(34, 0.3),
    lineHeight: moderateScale(42, 0.3),
    color: "#009FE3",
  },
  button: {
    width: "auto",
    height: verticalScale(60),
    backgroundColor: "#009FE3",
    borderRadius: moderateScale(10, 0.5),
    paddingHorizontal: scale(30),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },
  buttonText: {
    fontFamily: "Exo-Regular",
    fontWeight: 500,
    color: "#fff",
    fontSize: moderateScale(28, 0.3),
  },
  ecoMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: verticalScale(100),
  },
});
