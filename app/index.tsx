import { ScrollView, View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const App = () => {
  const { auth } = useGlobalContext();

  if (auth.isLoggedIn && !auth.isLoading)
    return <Redirect href="/(tabs)/home" />;

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex items-center min-h-[85vh] justify-center w-full">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl font-pbold text-white text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Plune</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-center text-gray-100 mt-6 px-4">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Plune
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyles="w-full mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default App;
