import React, { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInactivity } from "../context/InactivityContext";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import ProductCard from "../components/productosScreen/ProductCard";
import { Product } from "../types/products";
import { getProducts } from "../i18n/textparts/products";
import ProductModal from "../components/productModal";
import { scale, verticalScale, moderateScale } from "../utils/scaling";

export default function ProductosScreen() {
  const { resetInactivityTimer, setIsVideoPlaying } = useInactivity();
  const { t } = useTranslation("products");
  const products = useMemo(() => getProducts(t), [t]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Señalizar al contexto de inactividad cuando el modal de producto tiene video
  useEffect(() => {
    setIsVideoPlaying(modalVisible && !!selectedProduct?.modalData?.video);
    return () => setIsVideoPlaying(false);
  }, [modalVisible, selectedProduct]);

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
              <Text style={styles.titleBlack}>{t("header.titleOur")}</Text>
              <Text style={styles.titleBlue}>{t("header.titleDevices")}</Text>
            </Text>
            <Text style={styles.subtitle}>{t("header.subtitle")}</Text>
            <Text style={styles.thirdTitle}>{t("header.thirdTitle")}</Text>
          </View>
        </View>

        {/* Grid de productos */}
        <View style={styles.grid}>
          {products.map((product) => (
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
    paddingTop: verticalScale(40),
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    paddingBottom: 0,
  },
  headerIcon: {
    width: scale(47),
    height: scale(47),
    marginRight: scale(16),
  },
  headerTextContainer: {
    flex: 1,
    marginBottom: verticalScale(140),
  },
  mainTitle: {
    fontSize: moderateScale(36, 0.3),
    fontFamily: "Exo-Bold",
    fontWeight: "700",
    lineHeight: moderateScale(36, 0.3),
  },
  titleBlack: {
    color: "#000",
  },
  titleBlue: {
    color: "#00B4D8",
  },
  subtitle: {
    fontSize: moderateScale(18, 0.3),
    fontFamily: "Exo-Regular",
    fontWeight: "400",
    color: "#000000",
    marginBottom: verticalScale(6),
  },
  thirdTitle: {
    fontSize: moderateScale(20, 0.3),
    fontFamily: "Exo-SemiBold",
    fontWeight: "600",
    color: "#00B4D8",
    lineHeight: moderateScale(22, 0.3),
    textTransform: "uppercase",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    columnGap: 25,
    rowGap: verticalScale(70),
  },
});
