import React, { useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useTranslation } from "react-i18next";
import TextParts from "../productModal/TextParts";
import { getEcofrogPage1Data } from "../../i18n/textparts/ecofrogPage1";
import IconsBottomContainer from "../IconsBottomContainer";
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

const { width: screenWidth } = Dimensions.get("window");

const BRAND_SIZE = scale(100);
const BRAND_MARGIN = scale(20);
const BRAND_TOTAL = BRAND_SIZE + BRAND_MARGIN;

// Solo agregar las imágenes extra necesarias para cubrir la pantalla
const EXTRA_BRANDS_NEEDED = Math.ceil(screenWidth / BRAND_TOTAL) + 1;

const brands = [
  require("../../assets/products/modalEcofrog/brands/brand_1.png"),
  require("../../assets/products/modalEcofrog/brands/brand_2.png"),
  require("../../assets/products/modalEcofrog/brands/brand_3.png"),
  require("../../assets/products/modalEcofrog/brands/brand_4.png"),
  require("../../assets/products/modalEcofrog/brands/brand_5.png"),
  require("../../assets/products/modalEcofrog/brands/brand_6.png"),
  require("../../assets/products/modalEcofrog/brands/brand_7.png"),
  require("../../assets/products/modalEcofrog/brands/brand_8.png"),
  require("../../assets/products/modalEcofrog/brands/brand_9.png"),
  require("../../assets/products/modalEcofrog/brands/brand_10.png"),
  require("../../assets/products/modalEcofrog/brands/brand_11.png"),
  require("../../assets/products/modalEcofrog/brands/brand_12.png"),
  require("../../assets/products/modalEcofrog/brands/brand_13.png"),
  require("../../assets/products/modalEcofrog/brands/brand_14.png"),
  require("../../assets/products/modalEcofrog/brands/brand_15.png"),
  require("../../assets/products/modalEcofrog/brands/brand_16.png"),
  require("../../assets/products/modalEcofrog/brands/brand_17.png"),
  require("../../assets/products/modalEcofrog/brands/brand_18.png"),
  require("../../assets/products/modalEcofrog/brands/brand_19.png"),
  require("../../assets/products/modalEcofrog/brands/brand_20.png"),
  require("../../assets/products/modalEcofrog/brands/brand_21.png"),
  require("../../assets/products/modalEcofrog/brands/brand_22.png"),
  require("../../assets/products/modalEcofrog/brands/brand_23.png"),
  require("../../assets/products/modalEcofrog/brands/brand_24.png"),
  require("../../assets/products/modalEcofrog/brands/brand_25.png"),
  require("../../assets/products/modalEcofrog/brands/brand_26.png"),
  require("../../assets/products/modalEcofrog/brands/brand_27.png"),
  require("../../assets/products/modalEcofrog/brands/brand_28.png"),
  require("../../assets/products/modalEcofrog/brands/brand_29.png"),
  require("../../assets/products/modalEcofrog/brands/brand_30.png"),
  require("../../assets/products/modalEcofrog/brands/brand_31.png"),
];

export default function EcofrogPage1() {
  const { t } = useTranslation("ecofrog");
  const pageData = useMemo(() => getEcofrogPage1Data(t), [t]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const singleSetWidth = brands.length * BRAND_TOTAL;

    const runAnimation = () => {
      if (!isMounted.current) return;

      scrollX.setValue(0);
      Animated.timing(scrollX, {
        toValue: -singleSetWidth,
        duration: 25000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && isMounted.current) {
          runAnimation();
        }
      });
    };

    runAnimation();

    return () => {
      isMounted.current = false;
      scrollX.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.content}>
      {/* Logo */}
      <Image
        source={require("../../assets/products/modalEcofrog/ecofrogLogoModal.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{pageData.titlePrefix}</Text>
        <Text style={[styles.title, styles.titleHighlight]}>{pageData.titleO}</Text>
        <Text style={[styles.title, styles.titleHighlight, styles.subscript3]}>
          {pageData.titleSubscript}
        </Text>
        <Text style={[styles.title, styles.titleHighlight]}>{pageData.titleSuffix}</Text>
      </View>

      {/* Subtítulo */}
      <TextParts parts={pageData.subtitle} baseStyle={styles.subtitle} />

      {/* Descripcion */}
      <TextParts parts={pageData.description} baseStyle={styles.description} />

      {/* Items */}
      {pageData.items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Image source={item.icon} style={styles.itemIcon} />
          <View style={styles.itemContent}>
            <TextParts
              parts={[{ text: item.title, bold: true }]}
              baseStyle={styles.itemTitle}
            />
            <TextParts
              parts={item.description}
              baseStyle={styles.itemDescription}
            />
          </View>
        </View>
      ))}

      {/* Brands Carousel */}
      <View style={styles.carouselContainer}>
        <Animated.View
          style={[
            styles.carouselTrack,
            { transform: [{ translateX: scrollX }] },
          ]}
        >
          {[...brands, ...brands.slice(0, EXTRA_BRANDS_NEEDED)].map(
            (brand, index) => (
              <Image
                key={index}
                source={brand}
                style={styles.brandImage}
                resizeMode="contain"
              />
            ),
          )}
        </Animated.View>
      </View>

      <View>
        <IconsBottomContainer showmessage={false} size={50} />
      </View>

      <View style={styles.sprayContainer}>
        <Image
          source={require("../../assets/products/modalEcofrog/spray.png")}
          style={styles.sprayImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    alignItems: "center",
    overflow: "visible",
  },
  logo: {
    width: scale(350),
    height: verticalScale(120),
    marginBottom: verticalScale(10),
  },
  titleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: verticalScale(5),
  },
  title: {
    fontSize: moderateScale(32, 0.3),
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Exo-Medium",
  },
  titleHighlight: {
    color: "#00B4D8",
  },
  subscript3: {
    fontSize: moderateScale(20, 0.3),
  },
  subtitle: {
    width: "100%",
    fontSize: moderateScale(24, 0.3),
    textAlign: "center",
    color: "#000",
    marginBottom: verticalScale(20),
    fontFamily: "Exo-Medium",
    lineHeight: moderateScale(26, 0.3),
  },
  description: {
    width: "100%",
    fontSize: moderateScale(20, 0.3),
    textAlign: "left",
    color: "#000",
    marginBottom: verticalScale(20),
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(26, 0.3),
  },

  item: {
    width: scale(400),
    height: "auto",
    padding: scale(15),
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    marginBottom: verticalScale(20),
  },
  itemIcon: {
    width: scale(40),
    height: scale(40),
    marginBottom: verticalScale(10),
  },
  itemContent: {
    width: "100%",
    flex: 1,
    marginLeft: scale(15),
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 1,
  },
  itemTitle: {
    fontSize: moderateScale(21, 0.3),
    fontWeight: "bold",
    color: "#000",
    marginBottom: verticalScale(5),
    fontFamily: "Exo-Bold",
    textAlign: "left",
  },
  itemDescription: {
    fontSize: moderateScale(16, 0.3),
    textAlign: "left",
    color: "#000",
    fontFamily: "Exo-Medium",
    lineHeight: moderateScale(22, 0.3),
  },
  carouselContainer: {
    width: "100%",
    overflow: "hidden",
    marginBottom: verticalScale(20),
  },
  carouselTrack: {
    flexDirection: "row",
    alignItems: "center",
    gap: BRAND_MARGIN,
  },
  brandImage: {
    width: BRAND_SIZE,
    height: BRAND_SIZE,
    marginRight: BRAND_MARGIN,
  },
  sprayContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: Dimensions.get("window").height * 0.16,
    left: -Dimensions.get("window").width * 0.36,
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    overflow: "visible",
    alignItems: "center",
  },
  sprayImage: {
    width: Dimensions.get("window").width * 0.65,
    height: Dimensions.get("window").width * 0.65,
    objectFit: "contain",
  },
});
