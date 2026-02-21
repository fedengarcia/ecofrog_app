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
              part.bold && styles.boldText,
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
  boldText: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  highlightText: {
    color: "#00B4D8",
    fontFamily: "Exo-Bold",
  },
});
