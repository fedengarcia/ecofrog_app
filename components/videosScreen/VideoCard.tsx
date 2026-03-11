import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { VideoCategory } from "./types";
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

interface VideoCardProps {
  category: VideoCategory;
  onPress: () => void;
}

export default function VideoCard({ category, onPress }: VideoCardProps) {
  const { width } = useWindowDimensions();

  // 2 columnas cuando width > 500px, 1 columna sino
  const isTwoColumns = width > 500;
  const horizontalPadding = scale(24); // padding del ScrollView (12) * 2
  const gap = scale(60); // gap del grid
  const cardMargin = scale(16); // margin de la card (8 * 2)

  const cardWidth = isTwoColumns
    ? (width - horizontalPadding - gap - cardMargin * 2) / 2
    : width - horizontalPadding - cardMargin;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={category.backgroundImage}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0.75)"]}
          locations={[0.524, 0.875]}
          style={styles.gradient}
        >
          <Image
            source={category.icon}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={1}>
            {category.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {category.description}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(20, 0.5),
    margin: scale(8),
    height: verticalScale(260),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImageStyle: {
    borderRadius: moderateScale(20, 0.5),
  },
  gradient: {
    flex: 1,
    padding: scale(20),
    gap: scale(10),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(10, 0.5),
    marginBottom: verticalScale(12),
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: moderateScale(26, 0.3),
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: verticalScale(6),
    textAlign: "center",
    lineHeight: moderateScale(42, 0.3),
  },
  description: {
    fontFamily: "Exo-Medium",
    fontSize: moderateScale(14, 0.3),
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: moderateScale(18, 0.3),
  },
});
