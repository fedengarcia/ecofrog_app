import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useTranslation } from "react-i18next";
import TextParts from "../productModal/TextParts";
import { getEcofrogPage2Data } from "../../i18n/textparts/ecofrogPage2";
import IconsBottomContainer from "../IconsBottomContainer";

export default function EcofrogPage2() {
  const { t } = useTranslation("ecofrog");
  const pageData = useMemo(() => getEcofrogPage2Data(t), [t]);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setIsVideoLoading(true);
  }, []);

  const handleVideoPress = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.backgroundImageWrapper}>
        <Image
          source={require("../../assets/products/modalEcofrog/background.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </View>
      {/* Logo */}
      <Image
        source={require("../../assets/products/modalEcofrog/ecofrogLogoModal.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <TextParts parts={pageData.title} baseStyle={styles.title} />

      {/* Descripción */}
      <TextParts parts={pageData.description} baseStyle={styles.description} />

      {/* Columnas */}
      <View style={styles.columnsRow}>
        {/* Columna 1 — 70% */}
        <View style={styles.columnLeft}>
          <TextParts
            parts={pageData.column1.title}
            baseStyle={styles.columnTitleLeft}
          />
          <TextParts
            parts={pageData.column1.description}
            baseStyle={styles.columnDescLeft}
          />
          <View style={styles.videoSection}>
            {/* Plant image — absolute left of video */}
            <Image
              source={require("../../assets/products/modalEcofrog/plant.png")}
              style={styles.plantImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleVideoPress}
              style={styles.videoWrapper}
            >
              {isVideoLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#00B4D8" />
                </View>
              )}
              <Video
                ref={videoRef}
                source={{ uri: pageData.column1.video }}
                style={[styles.video, isVideoLoading && { opacity: 0 }]}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
                isMuted
                onLoad={() => setIsVideoLoading(false)}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Columna 2 — 30% */}
        <View style={styles.columnRight}>
          <TextParts
            parts={pageData.column2.description}
            baseStyle={styles.columnDescRight}
          />
          <View style={styles.columnImageWrapper}>
            <Image
              source={pageData.column2.image}
              style={styles.columnImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>{pageData.certifications}</Text>
        <Image
          source={require("../../assets/products/modalEcofrog/certificationsMemerships.png")}
          style={styles.certificationsImage}
          resizeMode="contain"
        />
      </View>
      <IconsBottomContainer showmessage={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
    overflow: "visible",
  },
  backgroundImageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 500,
    overflow: "hidden",

    zIndex: 0,
  },
  backgroundImage: {
    position: "absolute",
    top: -320,
    right: -40,
    width: 900,
    height: 900,
    opacity: 0.1,
  },
  logo: {
    width: 350,
    height: 120,
    marginBottom: 30,
  },
  title: {
    width: "100%",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    fontFamily: "Exo-Bold",
    textAlign: "left",
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
  columnsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    marginTop: 10,
    alignItems: "stretch",
    overflow: "visible",
  },
  columnLeft: {
    width: "60%",
    padding: 18,
    overflow: "visible",
  },
  columnRight: {
    width: "40%",
    borderRadius: 16,
    height: 320,
  },
  columnTitleLeft: {
    width: "100%",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 14,
    fontFamily: "Exo-Bold",
    textAlign: "right",
  },
  columnDescLeft: {
    width: "100%",
    fontSize: 16,
    textAlign: "right",
    color: "#000",
    marginBottom: 16,
    fontFamily: "Exo-Regular",
    lineHeight: 24,
  },
  columnDescRight: {
    width: "100%",
    fontSize: 16,
    textAlign: "left",
    color: "#000",
    marginBottom: 16,
    fontFamily: "Exo-Regular",
    lineHeight: 24,
    backgroundColor: "#F2F2F7",
    padding: 12,
  },
  videoSection: {
    width: "100%",
    position: "relative",
  },
  videoWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  plantImage: {
    position: "absolute",
    right: 180,
    bottom: 40,
    width: 400,
    height: 400,
    zIndex: -2,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 1,
  },
  columnImageWrapper: {
    width: "100%",
    position: "relative",
    flex: 1,
  },
  columnImage: {
    position: "absolute",
    top: "10%",
    left: "50%",
    width: 280,
    transform: [{ translateX: -0.5 * 280 }, { translateY: -0.5 * 250 }],
    aspectRatio: 1,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomText: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
    color: "#000",
    fontFamily: "Exo-Bold",
  },
  certificationsImage: {
    marginTop: -10,
    marginBottom: 20,
    width: "100%",
    height: 60,
  },
});
