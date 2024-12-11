import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/hooks/useAppwrite";
import { getUserPosts } from "@/actions/posts";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import { signOut } from "@/actions/auth";
import { router } from "expo-router";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
  const { auth, setAuth } = useGlobalContext();

  const { data: posts } = useAppwrite(() =>
    getUserPosts(auth.user?.$id as string)
  );

  const logout = async () => {
    await signOut();
    setAuth((prev) => ({ ...prev, user: null, isLoggedIn: false }));
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found."
            subtitle="No videos found for this profile."
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: auth.user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={posts.length || 0}
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
