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
import { scale, verticalScale, moderateScale } from "../../utils/scaling";
import { useInactivity } from "../../context/InactivityContext";

export default function EcofrogPage2() {
  const { t } = useTranslation("ecofrog");
  const pageData = useMemo(() => getEcofrogPage2Data(t), [t]);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const { setIsVideoPlaying } = useInactivity();

  useEffect(() => {
    setIsVideoLoading(true);
  }, []);

  // Señalizar al contexto de inactividad que hay video reproduciéndose
  useEffect(() => {
    setIsVideoPlaying(true);
    return () => setIsVideoPlaying(false);
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
              <Video
                ref={videoRef}
                source={{ uri: pageData.column1.video }}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
                isMuted
                onLoad={() => setIsVideoLoading(false)}
              />
              {isVideoLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#00B4D8" />
                </View>
              )}
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

const COLUMN_IMAGE_WIDTH = scale(280);

const styles = StyleSheet.create({
  content: {
    width: "100%",
    paddingHorizontal: scale(20),
    alignItems: "center",
    position: "relative",
    overflow: "visible",
  },
  backgroundImageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: verticalScale(500),
    overflow: "hidden",
    zIndex: 0,
  },
  backgroundImage: {
    position: "absolute",
    top: verticalScale(-320),
    right: scale(-40),
    width: scale(900),
    height: scale(900),
    opacity: 0.1,
  },
  logo: {
    width: scale(350),
    height: verticalScale(120),
    marginBottom: verticalScale(30),
  },
  title: {
    width: "100%",
    fontSize: moderateScale(22, 0.3),
    fontWeight: "bold",
    color: "#000",
    marginBottom: verticalScale(20),
    fontFamily: "Exo-Bold",
    textAlign: "left",
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
  columnsRow: {
    flexDirection: "row",
    width: "100%",
    gap: scale(20),
    marginTop: verticalScale(10),
    alignItems: "stretch",
    overflow: "visible",
  },
  columnLeft: {
    width: "60%",
    padding: scale(18),
    overflow: "visible",
  },
  columnRight: {
    width: "40%",
    borderRadius: moderateScale(16, 0.5),
    height: verticalScale(320),
  },
  columnTitleLeft: {
    width: "100%",
    fontSize: moderateScale(22, 0.3),
    fontWeight: "bold",
    color: "#000",
    marginBottom: verticalScale(14),
    fontFamily: "Exo-Bold",
    textAlign: "right",
  },
  columnDescLeft: {
    width: "100%",
    fontSize: moderateScale(16, 0.3),
    textAlign: "right",
    color: "#000",
    marginBottom: verticalScale(16),
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(24, 0.3),
  },
  columnDescRight: {
    width: "100%",
    fontSize: moderateScale(16, 0.3),
    textAlign: "left",
    color: "#000",
    marginBottom: verticalScale(16),
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(24, 0.3),
    backgroundColor: "#F2F2F7",
    padding: scale(12),
  },
  videoSection: {
    width: "100%",
    position: "relative",
  },
  videoWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: moderateScale(12, 0.5),
    overflow: "hidden",
    backgroundColor: "#000",
  },
  plantImage: {
    position: "absolute",
    right: scale(180),
    bottom: verticalScale(40),
    width: scale(400),
    height: scale(400),
    zIndex: -2,
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 10,
    elevation: 10,
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
    width: COLUMN_IMAGE_WIDTH,
    transform: [
      { translateX: -0.5 * COLUMN_IMAGE_WIDTH },
      { translateY: -0.5 * verticalScale(200) },
    ],
    aspectRatio: 1,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  bottomText: {
    width: "100%",
    textAlign: "left",
    fontSize: moderateScale(20, 0.3),
    color: "#000",
    fontFamily: "Exo-Bold",
  },
  certificationsImage: {
    marginTop: verticalScale(-10),
    marginBottom: verticalScale(20),
    width: "100%",
    height: verticalScale(60),
  },
});
