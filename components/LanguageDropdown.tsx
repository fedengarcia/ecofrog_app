import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";

const flags: Record<string, any> = {
  en: require("../assets/flags/en.png"),
  es: require("../assets/flags/es.png"),
};

export default function LanguageDropdown() {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const options: ("en" | "es")[] = ["en", "es"];
  const labels: Record<string, string> = { en: "EN", es: "ES" };

  const handleSelect = (lang: "en" | "es") => {
    changeLanguage(lang);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(!open)}>
        <Image
          source={flags[language]}
          style={styles.flag}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>{labels[language]}</Text>
        <Text style={styles.arrow}>{open ? "\u25B2" : "\u25BC"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {options
            .filter((o) => o !== language)
            .map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Image
                  source={flags[option]}
                  style={styles.flag}
                  resizeMode="contain"
                />
                <Text style={styles.optionText}>{labels[option]}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    right: 40,
    zIndex: 100,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Exo-Medium",
    color: "#333",
  },
  arrow: {
    fontSize: 14,
    color: "#666",
  },
  flag: {
    width: 32,
    height: 22,
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 10,
  },
  optionText: {
    fontSize: 20,
    fontFamily: "Exo-Medium",
    color: "#333",
  },
});
