import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BubbleText as BubbleTextType, ProductId } from "../../types/products";
import { getProductColor } from "../../types/products";
import TextParts from "./TextParts";
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

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
  const titleColor = productId === ProductId.ELEKTRA ? "#8D418F" : color;

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
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10, 0.5),
    gap: scale(5),
    marginTop: verticalScale(20),
  },
  bubbleContainerFlat: {
    backgroundColor: "#E0E0E0",
    padding: scale(10),
    borderRadius: moderateScale(10, 0.5),
    gap: scale(5),
  },
  bubbleItem: {
    flexDirection: "row",
  },
  bubbleTitle: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: "bold",
  },
  bubbleBullet: {
    fontSize: moderateScale(18, 0.3),
    marginRight: scale(10),
    lineHeight: moderateScale(18, 0.3),
  },
  bubbleText: {
    fontSize: moderateScale(18, 0.3),
    color: "black",
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(18, 0.3),
    textAlign: "left",
    flex: 1,
  },
});
