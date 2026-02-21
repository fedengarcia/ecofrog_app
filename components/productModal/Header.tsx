import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { ProductId, TextPart } from "../../types/products";
import { headerStyles, baseStyles, getDynamicStyles } from "./styles";

interface HeaderProps {
  productId: ProductId;
  logo: ImageSourcePropType;
  image: ImageSourcePropType;
  imageModal?: ImageSourcePropType;
  title: TextPart[];
  subtitle: TextPart[];
}

export default function Header({
  productId,
  logo,
  image,
  imageModal,
  title,
  subtitle,
}: HeaderProps) {
  const dynamicStyles = getDynamicStyles(productId);

  const renderTextParts = (parts: TextPart[], baseStyle: any) => {
    return (
      <Text style={baseStyle}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text
              style={[
                part.bold && baseStyles.boldText,
                part.highlight && !part.otherColor && baseStyles.highlightText,
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
  };

  return (
    <>
      <View style={headerStyles.headerContainer}>
        <View style={headerStyles.productImageOverlay} />
        <Image
          source={imageModal ?? image}
          style={{
            ...headerStyles.productImage,
            top: dynamicStyles.productImagePosition.top,
            left: dynamicStyles.productImagePosition.left,
          }}
          resizeMode="contain"
        />
        <View>
          {/* Logo del producto */}
          <Image
            source={logo}
            style={headerStyles.productLogo}
            resizeMode="contain"
          />

          {/* Título */}
          {renderTextParts(title, headerStyles.title)}

          {/* Subtítulo (excepto CP) */}
          {productId !== ProductId.CP &&
            renderTextParts(subtitle, headerStyles.subtitle)}
        </View>
      </View>

      {/* Subtítulo para CP (ancho completo) */}
      {productId === ProductId.CP &&
        renderTextParts(subtitle, {
          ...headerStyles.subtitle,
          width: "100%",
        })}
    </>
  );
}
