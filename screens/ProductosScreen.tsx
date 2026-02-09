import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useInactivity } from "../context/InactivityContext";

type ProductosScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Productos"
>;

export default function ProductosScreen() {
  const navigation = useNavigation<ProductosScreenNavigationProp>();
  const { resetInactivityTimer } = useInactivity();

  const handleGoBack = () => {
    resetInactivityTimer();
    navigation.goBack();
  };

  return (
    <View style={styles.container} onTouchStart={resetInactivityTimer}>
      <Text style={styles.title}>Productos</Text>
      <Text style={styles.subtitle}>Lista de productos disponibles</Text>

      <View style={styles.productList}>
        <Text style={styles.product}>🌿 Producto Eco 1</Text>
        <Text style={styles.product}>🌱 Producto Eco 2</Text>
        <Text style={styles.product}>♻️ Producto Eco 3</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Volver a Home</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Toca la pantalla para resetear el timer de inactividad
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
    color: "#27ae60",
  },
  subtitle: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 30,
  },
  productList: {
    marginBottom: 40,
  },
  product: {
    fontSize: 20,
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
    minWidth: 250,
    textAlign: "center",
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
