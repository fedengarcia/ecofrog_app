import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import TextParts from "../productModal/TextParts";
import { TextPart } from "../../types/products";

// Datos de la página 2
const pageData = {
  title: [
    { text: "Our " },
    { text: "Mission", otherColor: "#8D418F", bold: true },
  ] as TextPart[],
  descriptions: [
    [
      { text: "At " },
      { text: "ECOFROG", otherColor: "#8D418F", bold: true },
      { text: ", we are committed to providing " },
      { text: "sustainable cleaning solutions", bold: true },
      { text: " that protect both people and the planet." },
    ],
    [
      { text: "We believe in " },
      { text: "innovation", bold: true },
      { text: " and " },
      { text: "responsibility", bold: true },
      { text: ", creating products that make a real difference." },
    ],
    [
      { text: "Join us in the movement towards a " },
      { text: "cleaner, greener future", otherColor: "#8D418F", bold: true },
      { text: "." },
    ],
  ] as TextPart[][],
};

export default function EcofrogPage2() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo */}
      <Image
        source={require("../../assets/products/modalEcofrog/ecofrogLogoModal.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <TextParts parts={pageData.title} baseStyle={styles.title} />

      {/* Descripciones */}
      {pageData.descriptions.map((desc, index) => (
        <TextParts key={index} parts={desc} baseStyle={styles.description} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 20,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 350,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
    fontFamily: "Exo-Bold",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    fontFamily: "Exo-Regular",
    lineHeight: 26,
    paddingHorizontal: 20,
  },
});
