import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";
import TextParts from "../productModal/TextParts";
import { TextPart } from "../../types/products";
import IconsBottomContainer from "../IconsBottomContainer";

const { width: screenWidth } = Dimensions.get("window");

const BRAND_SIZE = 100;
const BRAND_MARGIN = 20;
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

// Datos de la página 1
const pageData = {
  // title se renderiza manualmente en el JSX para el subscript del "3"
  subtitle: [
    { text: "We market, design and manufacture eco-sustainable and healthy" },
    {
      text: " cleaning and disinfection systems.",
      highlight: true,
      bold: true,
    },
  ] as TextPart[],
  description: [
    { text: "ECOFROG", highlight: true, bold: true },
    {
      text: " is a ",
    },
    { text: "global leader", bold: true },
    { text: " in " },
    { text: "ozonated water", bold: true, highlight: true },
    {
      text: " , thanks to its constant innovation, a solid international network of distributors, a latest-generation laboratory and a highly qualified professional and commercial team.",
    },
  ] as TextPart[],
  items: [
    {
      icon: require("../../assets/products/modalEcofrog/clockSand.png"),
      title: "+11 years in the sector",
      description: [
        { text: "ECOFROG", highlight: true, bold: true },
        {
          text: " has led the way in introducing  ",
        },
        { text: "ozone", bold: true },
        {
          text: " into water in businesses and homes for more than 11 years.",
        },
      ] as TextPart[],
    },
    {
      icon: require("../../assets/products/modalEcofrog/world.png"),
      title: "+20 countries",
      description: [
        {
          text: "Present in Europe, Latin America, United Kingdom, Africa, and the Middle East.",
        },
      ] as TextPart[],
    },
    {
      icon: require("../../assets/products/modalEcofrog/users.png"),
      title: "+60,000 customers",
      description: [
        {
          text: "A logical transition from homes to businesses that involve a community with cleaning and disinfection needs.",
        },
      ] as TextPart[],
    },
  ],
};

export default function EcofrogPage1() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

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
        <Text style={styles.title}>PIONEERS IN </Text>
        <Text style={[styles.title, styles.titleHighlight]}>O</Text>
        <Text style={[styles.title, styles.titleHighlight, styles.subscript3]}>
          3
        </Text>
        <Text style={[styles.title, styles.titleHighlight]}> TECHNOLOGY</Text>
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

      <View style={{ marginTop: -10 }}>
        <IconsBottomContainer showmessage={false} size={50} />
      </View>

      <View style={[
        styles.sprayContainer,
        {
          bottom: screenHeight * 0.16,
          left: -screenWidth * 0.36,
          height: screenHeight * 0.2,
        },
      ]}>
        <Image
          source={require("../../assets/products/modalEcofrog/spray.png")}
          style={[styles.sprayImage, { width: screenWidth * 0.65, height: screenWidth * 0.65 }]}
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
    width: 350,
    height: 120,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Exo-Medium",
  },
  titleHighlight: {
    color: "#00B4D8",
  },
  subscript3: {
    fontSize: 20,
  },
  subtitle: {
    width: "100%",
    fontSize: 24,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
    fontFamily: "Exo-Medium",
    lineHeight: 26,
  },
  description: {
    width: "100%",
    fontSize: 20,
    textAlign: "left",
    color: "#000",
    marginBottom: 20,
    fontFamily: "Exo-Regular",
    lineHeight: 26,
  },

  item: {
    width: 400,
    height: "auto",
    padding: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    marginBottom: 20,
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  itemContent: {
    width: "100%",
    flex: 1,
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 1,
  },
  itemTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    fontFamily: "Exo-Bold",
    textAlign: "left",
  },
  itemDescription: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
    fontFamily: "Exo-Medium",
    lineHeight: 22,
  },
  carouselContainer: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 20,
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
    width: "100%",
    overflow: "visible",
    alignItems: "center",
  },
  sprayImage: {
    objectFit: "contain",
  },
});
