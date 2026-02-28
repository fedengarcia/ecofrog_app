import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInactivity } from "../context/InactivityContext";
import Navbar from "../components/Navbar";
import ProductCard from "../components/productosScreen/ProductCard";
import { Product, ProductId, PRODUCTS } from "../types/products";
import ProductModal from "../components/productModal";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function ProductosScreen() {
  const { resetInactivityTimer } = useInactivity();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onTouchStart={resetInactivityTimer}
      >
        {/* Header con icono y títulos */}
        <View style={styles.header}>
          <Image
            source={require("../assets/products/ourDevicesIcon.png")}
            style={styles.headerIcon}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.mainTitle}>
              <Text style={styles.titleBlack}>OUR </Text>
              <Text style={styles.titleBlue}>DEVICES</Text>
            </Text>
            <Text style={styles.subtitle}>
              Smart solutions for efficient cleaning and disinfection
            </Text>
            <Text style={styles.thirdTitle}>
              Less chemicals products, same professional results
            </Text>
          </View>
        </View>

        {/* Grid de productos */}
        <View style={styles.grid}>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>
      </ScrollView>
      {selectedProduct && (
        <ProductModal
          visible={modalVisible}
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerIcon: {
    width: 47,
    height: 47,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
    marginBottom: 140,
  },
  mainTitle: {
    fontSize: 36,
    fontFamily: "Exo-Bold",
    fontWeight: "700",
    lineHeight: 36,
  },
  titleBlack: {
    color: "#000",
  },
  titleBlue: {
    color: "#00B4D8",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Exo-Light",
    fontWeight: "300",
    color: "#000000",
    marginBottom: 6,
  },
  thirdTitle: {
    fontSize: 24,
    fontFamily: "Exo-SemiBold",
    fontWeight: "600",
    color: "#00B4D8",
    lineHeight: 24,
    textTransform: "uppercase",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    columnGap: 15,
    rowGap: 120,
  },
});
