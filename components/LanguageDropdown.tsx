import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { scale, verticalScale, moderateScale } from "../utils/scaling";

const flags: Record<string, any> = {
  en: require("../assets/flags/en.png"),
  es: require("../assets/flags/es.png"),
};

interface LanguageDropdownProps {
  disabled?: boolean;
}

export default function LanguageDropdown({
  disabled = false,
}: LanguageDropdownProps) {
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
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={() => !disabled && setOpen(!open)}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Image
          source={flags[language]}
          style={styles.flag}
          resizeMode="contain"
        />
        <Text style={[styles.buttonText, disabled && styles.textDisabled]}>
          {labels[language]}
        </Text>
        {!disabled && (
          <Text style={styles.arrow}>{open ? "\u25B2" : "\u25BC"}</Text>
        )}
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
    top: verticalScale(40),
    right: scale(40),
    zIndex: 100,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: moderateScale(12, 0.5),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: "#ddd",
    gap: scale(10),
  },
  buttonText: {
    fontSize: moderateScale(20, 0.3),
    fontFamily: "Exo-Medium",
    color: "#333",
  },
  arrow: {
    fontSize: moderateScale(14, 0.3),
    color: "#666",
  },
  flag: {
    width: scale(32),
    height: verticalScale(22),
  },
  dropdown: {
    marginTop: verticalScale(4),
    backgroundColor: "#fff",
    borderRadius: moderateScale(12, 0.5),
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(12),
    gap: scale(10),
  },
  optionText: {
    fontSize: moderateScale(20, 0.3),
    fontFamily: "Exo-Medium",
    color: "#333",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  textDisabled: {
    color: "#666",
  },
});
