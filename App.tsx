import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { InactivityProvider } from "./context/InactivityContext";

function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text style={styles.infoText}>
        La pantalla se pondrá en modo sleep después de 15 segundos de
        inactividad
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <InactivityProvider>
      <MainScreen />
    </InactivityProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    marginTop: 20,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
