import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Product, ProductId, TextPart } from "../../types/products";
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  // 3 columnas en tablet, 1 en móvil
  // Restamos padding horizontal (40) + 2 gaps entre 3 columnas (30)
  const CARD_WIDTH = 200;
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
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={{
          ...styles.image,
          ...styles.overlay,
          ...{
            bottom:
              product.id === ProductId.AVATAR
                ? verticalScale(-60)
                : product.id === ProductId.WASH
                  ? verticalScale(-150)
                  : product.id === ProductId.CP
                    ? verticalScale(-100)
                    : product.id === ProductId.ELEKTRA
                      ? verticalScale(-55)
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
    borderRadius: moderateScale(16, 0.5),
    padding: scale(10),
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    width: "100%",
    height: verticalScale(200),
    position: "relative",
  },
  image: {
    width: "100%",
    height: verticalScale(340),
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  logo: {
    width: scale(140),
    height: verticalScale(40),
    marginBottom: verticalScale(12),
  },
  description: {
    fontSize: moderateScale(16, 0.3),
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: moderateScale(24, 0.3),
  },
  bold: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  highlight: {
    color: "#00B4D8",
  },
});
