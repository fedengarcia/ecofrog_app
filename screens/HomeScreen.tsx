import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

  const handleNavigateToProductos = () => {
    resetInactivityTimer();
    navigation.navigate("Productos");
  };

  return (
    <View style={styles.container} onTouchStart={resetInactivityTimer}>
      <Text style={styles.title}>Pantalla Home</Text>
      <Text style={styles.subtitle}>Bienvenido a EcoFrog</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToProductos}
      >
        <Text style={styles.buttonText}>Ir a Productos</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Inactividad de 15 segundos activará el modo sleep
      </Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    fontSize: 12,
    color: "#95a5a6",
    textAlign: "center",
    marginTop: 20,
  },
});
