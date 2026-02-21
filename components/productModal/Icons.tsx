import React from "react";
import { View, Text, Image } from "react-native";
import { ProductId, IconData } from "../../types/products";
import { iconStyles, getDynamicStyles } from "./styles";

interface IconsProps {
  productId: ProductId;
  icons: IconData[];
}

export default function Icons({ productId, icons }: IconsProps) {
  const dynamicStyles = getDynamicStyles(productId);
  const gap = dynamicStyles.getIconsGap(icons.length);

  return (
    <View
      style={{
        ...iconStyles.iconsContainer,
        gap,
        marginBottom: dynamicStyles.iconsMarginBottom,
      }}
    >
      {icons.map((icon, index) => (
        <View key={index} style={iconStyles.iconItem}>
          <Image
            source={icon.url}
            style={iconStyles.icon}
            resizeMode="contain"
          />
          <Text
            style={{
              ...iconStyles.iconLegend,
              color: dynamicStyles.iconLegendColor,
            }}
          >
            {icon.legend}
          </Text>
        </View>
      ))}
    </View>
  );
}
