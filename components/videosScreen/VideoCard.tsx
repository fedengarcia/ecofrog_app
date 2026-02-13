import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { VideoCategory } from "./types";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

interface VideoCardProps {
  category: VideoCategory;
  onPress: () => void;
}

export default function VideoCard({ category, onPress }: VideoCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
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
          <Text style={styles.title}>{category.title}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    margin: 8,
    width: 360,
    height: 260,
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
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    padding: 20,
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 35,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 6,
    textAlign: "center",
    lineHeight: 35,
  },
  description: {
    fontFamily: "Exo-Medium",
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 14,
  },
});
