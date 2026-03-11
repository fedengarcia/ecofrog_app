import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { ProductId, TextPart } from "../../types/products";
import { headerStyles, getDynamicStyles } from "./styles";
import TextParts from "./TextParts";

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

  return (
    <>
      <View
        style={[
          headerStyles.headerContainer,
          { marginBottom: dynamicStyles.headerMarginBottom },
        ]}
      >
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
          <TextParts parts={title} baseStyle={headerStyles.title} />

          {/* Subtítulo (excepto CP) */}
          {productId !== ProductId.CP && (
            <TextParts parts={subtitle} baseStyle={headerStyles.subtitle} />
          )}
        </View>
      </View>

      {/* Subtítulo para CP (ancho completo) */}
      {productId === ProductId.CP && (
        <TextParts
          parts={subtitle}
          baseStyle={{ ...headerStyles.subtitle, width: "100%" }}
        />
      )}
    </>
  );
}
