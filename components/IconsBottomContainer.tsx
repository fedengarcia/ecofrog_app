import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { scale, verticalScale, moderateScale } from "../utils/scaling";

export default function IconsBottomContainer({
  showmessage = true,
  size = 60,
}: {
  showmessage?: boolean;
  size?: number;
}) {
  const { t } = useTranslation("common");
  const scaledSize = scale(size);

  return (
    <View style={styles.container}>
      {showmessage && (
        <>
          <Text style={styles.title}>{t("ecoMessage.title")}</Text>
          <Text style={styles.subtitle}>{t("ecoMessage.subtitle")}</Text>
        </>
      )}
      <View style={styles.iconsContainer}>
        <Image
          source={require("../assets/home/iconStats.png")}
          style={[{ width: scaledSize, height: scaledSize }]}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/home/iconEco.png")}
          style={[{ width: scaledSize, height: scaledSize }]}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/home/iconRecicle.png")}
          style={[{ width: scaledSize, height: scaledSize }]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Exo-Bold",
    fontSize: moderateScale(20, 0.3),
    lineHeight: moderateScale(24, 0.3),
    textAlign: "center",
    color: "#009FE3",
    marginBottom: verticalScale(5),
  },
  subtitle: {
    fontFamily: "Exo-Bold",
    fontSize: moderateScale(20, 0.3),
    lineHeight: moderateScale(24, 0.3),
    textAlign: "center",
    color: "#000",
    marginBottom: verticalScale(20),
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(30),
  },
});
