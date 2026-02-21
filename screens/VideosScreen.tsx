import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import VideoCard from "../components/videosScreen/VideoCard";
import VideoModal from "../components/videosScreen/VideoModal";
import {
  VideoCategory,
  VideoCategoryId,
} from "../components/videosScreen/types";

// Datos de las categorías con enum
const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    id: VideoCategoryId.RESTAURANTS,
    title: "Restaurants",
    description: "Efficient disinfection for your customers",
    icon: require("../assets/videos/restaurantsIcon.png"),
    backgroundImage: require("../assets/videos/restaurantImage.png"),
    videoUrl:
      "https://www.ecofrog.es/wp-content/uploads/2026/02/restaurants-ecofrog-app-video-modal.mp4",
  },
  {
    id: VideoCategoryId.HOTELS,
    title: "Hotels",
    description: "Impeccable spaces enhance the experience",
    icon: require("../assets/videos/hotelsIcon.png"),
    backgroundImage: require("../assets/videos/hotelsImage.png"),
    videoUrl:
      "https://www.ecofrog.es/wp-content/uploads/2026/02/hoteles-ecofrog-app-video-modal.mp4",
  },
  {
    id: VideoCategoryId.EDUCATION_CENTER,
    title: "Education Center",
    description: "Safe environment for sustainable learning",
    icon: require("../assets/videos/educationIcon.png"),
    backgroundImage: require("../assets/videos/escolaImage.png"),
    videoUrl:
      "https://www.ecofrog.es/wp-content/uploads/2026/02/education-ecofrog-app-video-modal.mp4",
  },
  {
    id: VideoCategoryId.MEDICAL_CENTER,
    title: "Medical Center",
    description: "Maximum safety for patients",
    icon: require("../assets/videos/MedicalCenterIcon.png"),
    backgroundImage: require("../assets/videos/medicalCenterImage.png"),
    videoUrl:
      "https://www.ecofrog.es/wp-content/uploads/2026/02/medical-ecofrog-app-video-modal.mp4",
  },
  {
    id: VideoCategoryId.CATERING,
    title: "Catering",
    description: "Expert cleaning without chemical products",
    icon: require("../assets/videos/cateringIcon.png"),
    backgroundImage: require("../assets/videos/cateringImage.png"),
    videoUrl:
      "https://www.ecofrog.es/wp-content/uploads/2026/02/catering-ecofrog-app-video-modal.mp4",
  },
  {
    id: VideoCategoryId.B2C,
    title: "B2C",
    description: "Ozonated Water also at home",
    icon: require("../assets/videos/ozonatedWaterIcon.png"),
    backgroundImage: require("../assets/videos/ozonatedWaterImage.png"),
    videoUrl:
      "https://www.ecofrog.es/wp-content/uploads/2026/02/b2c-ecofrog-app-video-modal.mp4",
  },
];

export default function VideosScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<VideoCategory | null>(null);

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
