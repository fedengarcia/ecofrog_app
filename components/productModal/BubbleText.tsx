import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BubbleText as BubbleTextType, ProductId } from "../../types/products";
import { getProductColor } from "../../types/products";
import TextParts from "./TextParts";

interface BubbleTextProps {
  bubbleText: BubbleTextType;
  productId: ProductId;
  isInsideContainer?: boolean;
}

export default function BubbleText({
  bubbleText,
  productId,
  isInsideContainer = true,
}: BubbleTextProps) {
  const color = getProductColor(productId);
  const titleColor =
    bubbleText.title === "Multiple uses" ? "#8D418F" : color;

  const containerStyle = isInsideContainer
    ? styles.bubbleContainer
    : styles.bubbleContainerFlat;

  return (
    <View style={containerStyle}>
      {bubbleText.title && (
        <Text style={[styles.bubbleTitle, { color: titleColor }]}>
          {bubbleText.title}
        </Text>
      )}
      {bubbleText.items.map((item, index) => (
        <View key={index} style={styles.bubbleItem}>
          {!bubbleText.withoutDots && (
            <Text style={[styles.bubbleBullet, { color }]}>»</Text>
          )}
          <TextParts parts={item} baseStyle={styles.bubbleText} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    gap: 5,
    marginTop: 20,
  },
  bubbleContainerFlat: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  bubbleItem: {
    flexDirection: "row",
  },
  bubbleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bubbleBullet: {
    fontSize: 18,
    marginRight: 10,
    lineHeight: 18,
  },
  bubbleText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Exo-Regular",
    lineHeight: 18,
    textAlign: "left",
    flex: 1,
  },
});
