import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useInactivity } from "../context/InactivityContext";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { resetInactivityTimer } = useInactivity();

  const handleStartTour = () => {
    resetInactivityTimer();
    navigation.navigate("Productos");
  };

  return (
    <View style={styles.container} onTouchStart={resetInactivityTimer}>
      {/* Background Frog Image */}
      <Image
        source={require("../assets/home/frogBackgroundHome.png")}
        style={styles.backgroundFrog}
        resizeMode="contain"
      />

      {/* Logo */}
      <Image
        source={require("../assets/ecofrogLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.content}>
        {/* Tagline */}
        <Text style={styles.tagline}>
          Leaders in sustainable cleaning and disinfection solutions in your
          sector with{" "}
          <Text style={styles.taglineHighlight}>ozonated water</Text>
        </Text>

        {/* Start Tour Button */}
        <TouchableOpacity style={styles.button} onPress={handleStartTour}>
          <Text style={styles.buttonText}>Start the Tour</Text>
        </TouchableOpacity>
      </View>

      {/* Eco Message */}
      <View style={styles.ecoMessage}>
        <Text style={styles.ecoTitle}>REDUCE | REUSE | RECYCLE</Text>
        <Text style={styles.ecoSubtitle}>ECOFROG'S MIND IS A GREEN FUTURE</Text>
        {/* Icons */}
        <View style={styles.iconsContainer}>
          <Image
            source={require("../assets/home/iconEco.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/home/iconRecicle.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/home/iconStats.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
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
    padding: 20,
  },
  backgroundFrog: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 750,
    height: 750,
    opacity: 1,
  },
  logo: {
    marginTop: 240,
    flex: 1,
    width: 800,
    height: 280,
  },
  content: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tagline: {
    flex: 1,
    width: 650,
    fontFamily: "Exo-Regular",
    fontSize: 34,
    lineHeight: 42,
    textAlign: "center",
    color: "#000",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  taglineHighlight: {
    fontFamily: "Exo-Bold",
    fontSize: 34,
    lineHeight: 42,
    color: "#009FE3",
  },
  button: {
    width: "auto",
    height: 60,
    backgroundColor: "#009FE3",
    borderRadius: 10,
    paddingHorizontal: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: "Exo-Regular",
    fontWeight: 500,
    color: "#fff",
    fontSize: 28,
  },
  ecoMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 40,
  },
  ecoTitle: {
    fontFamily: "Exo-Bold",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#009FE3",
    marginBottom: 5,
  },
  ecoSubtitle: {
    fontFamily: "Exo-Bold",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
