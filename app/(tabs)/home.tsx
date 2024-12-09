import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/hooks/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/actions/posts";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const { auth } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back,
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {auth.user?.name}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <Text className="text-lg font-pregular mt-7 text-gray-100 mb-3">
              Latest Videos
            </Text>

            <Trending posts={latestPosts ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found."
            subtitle="No videos created yet."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
