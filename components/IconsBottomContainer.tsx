import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function IconsBottomContainer({
  showmessage = true,
  size = 60,
}: {
  showmessage?: boolean;
  size?: number;
}) {
  return (
    <View style={styles.container}>
      {showmessage && (
        <>
          <Text style={styles.title}>REDUCE | REUSE | RECYCLE</Text>
          <Text style={styles.subtitle}>ECOFROG'S MIND IS A GREEN FUTURE</Text>
        </>
      )}
      <View style={styles.iconsContainer}>
        <Image
          source={require("../assets/home/iconStats.png")}
          style={[{ width: size, height: size }]}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/home/iconEco.png")}
          style={[{ width: size, height: size }]}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/home/iconRecicle.png")}
          style={[{ width: size, height: size }]}
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
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#009FE3",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Exo-Bold",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
});
