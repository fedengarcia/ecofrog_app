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

export default function VideosScreen() {
  const { t } = useTranslation("videos");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<VideoCategory | null>(null);

  const VIDEO_CATEGORIES: VideoCategory[] = useMemo(() => [
    {
      id: VideoCategoryId.RESTAURANTS,
      title: t("categories.restaurants.title"),
      description: t("categories.restaurants.description"),
      icon: require("../assets/videos/restaurantsIcon.png"),
      backgroundImage: require("../assets/videos/restaurantImage.png"),
      videoUrl: "https://www.ecofrog.es/wp-content/uploads/2026/02/restaurants-ecofrog-app-video-modal.mp4",
    },
    {
      id: VideoCategoryId.HOTELS,
      title: t("categories.hotels.title"),
      description: t("categories.hotels.description"),
      icon: require("../assets/videos/hotelsIcon.png"),
      backgroundImage: require("../assets/videos/hotelsImage.png"),
      videoUrl: "https://www.ecofrog.es/wp-content/uploads/2026/02/hoteles-ecofrog-app-video-modal.mp4",
    },
    {
      id: VideoCategoryId.EDUCATION_CENTER,
      title: t("categories.educationCenter.title"),
      description: t("categories.educationCenter.description"),
      icon: require("../assets/videos/educationIcon.png"),
      backgroundImage: require("../assets/videos/escolaImage.png"),
      videoUrl: "https://www.ecofrog.es/wp-content/uploads/2026/02/education-ecofrog-app-video-modal.mp4",
    },
    {
      id: VideoCategoryId.MEDICAL_CENTER,
      title: t("categories.medicalCenter.title"),
      description: t("categories.medicalCenter.description"),
      icon: require("../assets/videos/MedicalCenterIcon.png"),
      backgroundImage: require("../assets/videos/medicalCenterImage.png"),
      videoUrl: "https://www.ecofrog.es/wp-content/uploads/2026/02/medical-ecofrog-app-video-modal.mp4",
    },
    {
      id: VideoCategoryId.CATERING,
      title: t("categories.catering.title"),
      description: t("categories.catering.description"),
      icon: require("../assets/videos/cateringIcon.png"),
      backgroundImage: require("../assets/videos/cateringImage.png"),
      videoUrl: "https://www.ecofrog.es/wp-content/uploads/2026/02/catering-ecofrog-app-video-modal.mp4",
    },
    {
      id: VideoCategoryId.B2C,
      title: t("categories.b2c.title"),
      description: t("categories.b2c.description"),
      icon: require("../assets/videos/ozonatedWaterIcon.png"),
      backgroundImage: require("../assets/videos/ozonatedWaterImage.png"),
      videoUrl: "https://www.ecofrog.es/wp-content/uploads/2026/02/b2c-ecofrog-app-video-modal.mp4",
    },
  ], [t]);

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
    padding: 12,
  },
  grid: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 60,
    justifyContent: "center",
    alignContent: "center",
  },
});
