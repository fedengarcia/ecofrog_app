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
import { Product, ProductId } from "../components/productosScreen/types";
import ProductModal from "../components/productosScreen/ProductModal";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

// Datos de los productos con enum
const PRODUCTS: Product[] = [
  {
    id: ProductId.AVATAR,
    logo: require("../assets/products/avatar/avatarLogo.png"),
    image: require("../assets/products/avatar/avatarImage.png"),
    textParts: [
      { text: "Commit to " },
      { text: "OZONE", highlight: true },
      { text: " in your " },
      { text: "business", bold: true },
    ],
  },
  {
    id: ProductId.WASH,
    logo: require("../assets/products/wash/washLogo.png"),
    image: require("../assets/products/wash/washImage.png"),
    textParts: [
      { text: "Reduce ", bold: true },
      { text: "detergent and rinse aid in your " },
      { text: "commercial dishwasher", highlight: true },
    ],
  },
  {
    id: ProductId.TROLLEY,
    logo: require("../assets/products/trolley/trolleyLogo.png"),
    image: require("../assets/products/trolley/trolleyImage.png"),
    textParts: [
      { text: "Smart " },
      { text: "portable cleaning", bold: true },
      { text: " with " },
      { text: "ozonated water", highlight: true },
    ],
  },
  {
    id: ProductId.CP,
    logo: require("../assets/products/cp/cpLogo.png"),
    image: require("../assets/products/cp/cpImage.png"),
    textParts: [
      { text: "For " },
      { text: "large volumes", bold: true },
      { text: " of water" },
    ],
  },
  {
    id: ProductId.ELEKTRA,
    logo: require("../assets/products/elektra/elektraLogo.png"),
    image: require("../assets/products/elektra/elektraImage.png"),
    textParts: [
      { text: "Ozonated water", highlight: true, otherColor: "#8D418F" },
      { text: " also at " },
      { text: "home" },
      { text: "for " },
      { text: "household cleaning", bold: true },
      { text: " and " },
      { text: "laundry", bold: true },
    ],
    modalData: {
      title: [
        {
          text: "Ozonated water",
          highlight: true,
          otherColor: "#8D418F",
          bold: true,
        },
        { text: " also at " },
        { text: "home" },
        { text: "for " },
        { text: "household cleaning", bold: true },
        { text: " and " },
        { text: "laundry", bold: true },
      ],
      subtitle: [
        { text: "ELEKTRA", highlight: true, otherColor: "#8D418F", bold: true },
        { text: " allows you to clean and disinfect" },
        {
          text: " any room in the house and wash clothes",
          bold: true,
        },
        {
          text: " with ozonated water without the need for chemical products.",
        },
      ],
      icons: [
        {
          legend: "Minimal detergent usage",
          url: require("../assets/products/elektra/minimalDetergentUsage.png"),
        },
        {
          legend: "No plastic waste generated",
          url: require("../assets/products/elektra/noPlasticWaste.png"),
        },
        {
          legend: "Preserves colours in cold water",
          url: require("../assets/products/elektra/preservesColours.png"),
        },
        {
          legend: "Investment and savings at home",
          url: require("../assets/products/elektra/investmentAndSavings.png"),
        },
        {
          legend: "Simple and easy operation",
          url: require("../assets/products/elektra/simpleAndEasyOperation.png"),
        },
        {
          legend: "All types of spaces and surfaces",
          url: require("../assets/products/elektra/allTypesOfSpacesAndSurfaces.png"),
        },
      ],
      description_1: [
        { text: "ELEKTRA", highlight: true, otherColor: "#8D418F", bold: true },
        {
          text: " reduces cleaning product and energy consumption costs ",
          bold: true,
        },
        { text: "as it is effective in cold water. Its system " },
        {
          text: "ozonises",
          highlight: true,
          otherColor: "#8D418F",
          bold: true,
        },
        {
          text: " the water instantly, avoiding storage and contamination risks.",
          break: true,
        },
        {
          text: "It is 100% environmentally friendly, ",
        },
        { text: "eliminates fungus and bacteria", bold: true },
        {
          text: " and protects colours and neutralises odours in domestic washing.",
        },
      ],
      bubbleText: {
        title: "Multiple uses",
        items: [
          [
            { text: "Laundry connecting " },
            {
              text: "ELEKTRA ",
              otherColor: "#8D418F",
              highlight: true,
              bold: true,
            },
            { text: "to domestic wash machine" },
          ],
          [
            {
              text: "Floors, walls, sinks, windows, furniture, tiles, joints, screens... ",
            },
          ],
          [
            {
              text: "Extractor hoods, ovens, refrigerators, countertops, stoves, fryers, appliances... ",
            },
          ],
          [
            {
              text: "Rooms or surfaces previously cleaned with chemical products.",
            },
          ],
        ],
      },
      video:
        "https://www.ecofrog.es/wp-content/uploads/2026/02/Gina-ELEKTRA.mp4",
      showBubbleMedium: true,
    },
  },
];

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
    color: "#666",
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
    columnGap: 20,
    rowGap: 120,
  },
});
