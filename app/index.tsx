import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { verifyInstallation } from "nativewind";

const App = () => {

  return (
    <View>
      <Text className="text-2xl font-semibold">App</Text>
      <Link href="/profile">Go to profile</Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
