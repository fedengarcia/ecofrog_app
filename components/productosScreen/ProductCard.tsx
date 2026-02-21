import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Product, ProductId, TextPart } from "../../types/products";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

// 3 columnas en tablet, 1 en móvil
const CARD_WIDTH = isTablet ? (width - 80) / 3 : width - 40;

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const renderTextParts = (parts: TextPart[]) => {
    return (
      <Text style={styles.description}>
        {parts.map((part, index) => (
          <Text
            key={index}
            style={[
              part.bold && styles.bold,
              part.highlight && !part.otherColor && styles.highlight,
              part.otherColor && { color: part.otherColor },
            ]}
          >
            {part.text}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          ...styles.image,
          ...styles.overlay,
          ...{
            bottom:
              product.id === ProductId.AVATAR
                ? -60
                : product.id === ProductId.WASH
                  ? -150
                  : product.id === ProductId.CP
                    ? -100
                    : product.id === ProductId.ELEKTRA
                      ? -55
                      : undefined,
          },
        }}
      >
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Image source={product.logo} style={styles.logo} resizeMode="contain" />
      {renderTextParts(product.textParts)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 340,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  logo: {
    width: 140,
    height: 40,
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 24,
  },
  bold: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  highlight: {
    color: "#00B4D8",
  },
});
