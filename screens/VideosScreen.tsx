import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import VideoCard from "../components/videosScreen/VideoCard";
import VideoModal from "../components/videosScreen/VideoModal";
import {
  VideoCategory,
  VideoCategoryId,
} from "../components/videosScreen/types";
import { scale } from "../utils/scaling";
import i18n from "../i18n";

export default function VideosScreen() {
  const { t } = useTranslation("videos");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<VideoCategory | null>(null);

  const VIDEO_CATEGORIES: VideoCategory[] = useMemo(
    () => [
      {
        id: VideoCategoryId.RESTAURANTS,
        title: t("categories.restaurants.title"),
        description: t("categories.restaurants.description"),
        icon: require("../assets/videos/restaurantsIcon.png"),
        backgroundImage: require("../assets/videos/restaurantImage.png"),
        videoUrl: require("../assets/videos/videos_es/restaurants_es.mp4"),
      },
      {
        id: VideoCategoryId.HOTELS,
        title: t("categories.hotels.title"),
        description: t("categories.hotels.description"),
        icon: require("../assets/videos/hotelsIcon.png"),
        backgroundImage: require("../assets/videos/hotelsImage.png"),
        videoUrl: require("../assets/videos/videos_es/hotels_es.mp4"),
      },
      {
        id: VideoCategoryId.EDUCATION_CENTER,
        title: t("categories.educationCenter.title"),
        description: t("categories.educationCenter.description"),
        icon: require("../assets/videos/educationIcon.png"),
        backgroundImage: require("../assets/videos/escolaImage.png"),
        videoUrl: require("../assets/videos/videos_es/education_center_es.mp4"),
      },
      {
        id: VideoCategoryId.MEDICAL_CENTER,
        title: t("categories.medicalCenter.title"),
        description: t("categories.medicalCenter.description"),
        icon: require("../assets/videos/MedicalCenterIcon.png"),
        backgroundImage: require("../assets/videos/medicalCenterImage.png"),
        videoUrl: require("../assets/videos/videos_es/medical_center_es.mp4"),
      },
      {
        id: VideoCategoryId.CATERING,
        title: t("categories.catering.title"),
        description: t("categories.catering.description"),
        icon: require("../assets/videos/cateringIcon.png"),
        backgroundImage: require("../assets/videos/cateringImage.png"),
        videoUrl: require("../assets/videos/videos_es/catering_es.mp4"),
      },
      {
        id: VideoCategoryId.B2C,
        title: t("categories.b2c.title"),
        description: t("categories.b2c.description"),
        icon: require("../assets/videos/ozonatedWaterIcon.png"),
        backgroundImage: require("../assets/videos/ozonatedWaterImage.png"),
        videoUrl: require("../assets/videos/videos_es/b2c_es.mp4"),
      },
    ],
    [t],
  );

  const handleCategoryPress = (category: VideoCategory) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {VIDEO_CATEGORIES.map((category) => (
            <VideoCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>
      </ScrollView>

      <VideoModal
        visible={modalVisible}
        videoUrl={selectedCategory?.videoUrl || null}
        category={selectedCategory}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: scale(12),
  },
  grid: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(60),
    justifyContent: "center",
    alignContent: "center",
  },
});
