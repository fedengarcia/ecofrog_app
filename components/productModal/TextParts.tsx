import React from "react";
import { Text, StyleSheet } from "react-native";
import { TextPart } from "../../types/products";

interface TextPartsProps {
  parts: TextPart[];
  baseStyle?: any;
}

export default function TextParts({ parts, baseStyle }: TextPartsProps) {
  return (
    <Text style={baseStyle}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <Text
            style={[
              part.light && styles.lightText,
              part.regular && styles.regularText,
              part.medium && styles.mediumText,
              part.semiBold && styles.semiBoldText,
              part.bold && styles.boldText,
              part.extraBold && styles.extraBoldText,
              part.highlight && !part.otherColor && styles.highlightText,
              part.otherColor && { color: part.otherColor },
            ]}
          >
            {part.text}
          </Text>
          {part.break && "\n"}
        </React.Fragment>
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  lightText: {
    fontFamily: "Exo-Light",
  },
  regularText: {
    fontFamily: "Exo-Regular",
  },
  mediumText: {
    fontFamily: "Exo-Medium",
  },
  semiBoldText: {
    fontFamily: "Exo-SemiBold",
  },
  boldText: {
    fontFamily: "Exo-Bold",
  },
  extraBoldText: {
    fontFamily: "Exo-ExtraBold",
  },
  highlightText: {
    color: "#00B4D8",
    fontFamily: "Exo-Bold",
  },
});
