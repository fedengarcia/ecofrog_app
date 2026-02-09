import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useRef } from "react";
import { useFonts } from "expo-font";
import { InactivityProvider, useInactivity } from "./context/InactivityContext";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./navigation/types";

function Navigation() {
  const { setNavigationRef } = useInactivity();
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <NavigationContainer<RootStackParamList>
      ref={(ref) => {
        navigationRef.current = ref;
        setNavigationRef(ref);
      }}
    >
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "Exo-Regular": require("./assets/fonts/Exo-Regular.ttf"),
    "Exo-Bold": require("./assets/fonts/Exo-Bold.ttf"),
    "Exo-SemiBold": require("./assets/fonts/Exo-SemiBold.ttf"),
    "Exo-Medium": require("./assets/fonts/Exo-Medium.ttf"),
    "Exo-Light": require("./assets/fonts/Exo-Light.ttf"),
    "Exo-ExtraBold": require("./assets/fonts/Exo-ExtraBold.ttf"),
    "Exo-Black": require("./assets/fonts/Exo-Black.ttf"),
    "Exo-Thin": require("./assets/fonts/Exo-Thin.ttf"),
    "Exo-ExtraLight": require("./assets/fonts/Exo-ExtraLight.ttf"),
    "Exo-Italic": require("./assets/fonts/Exo-Italic.ttf"),
    "Exo-BoldItalic": require("./assets/fonts/Exo-BoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <InactivityProvider>
      <Navigation />
    </InactivityProvider>
  );
}
