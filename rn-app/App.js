import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import Checkout from "./components/Checkout";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StripeProvider publishableKey="pk_test_51JLlrQSCrqIF8lRiuhSYY7MVJSgCX6UwcuCBpj1uXQCqGncGi4KA9Zbsa9cj42TtuaNd8fN8QMu0YPXEjT6veHiY00RqWsKaoE">
        <Checkout />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
