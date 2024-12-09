import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";

import * as Animatable from "react-native-animatable";
import { zoomOut, zoomIn } from "@/utils/animations";

import { icons } from "@/constants";

import { Video, ResizeMode } from "expo-av";

interface TrendingItemProps {
  activeItem: Models.Document;
  item: Models.Document;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = React.useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[32px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: Models.Document[] | [] }) => {
  const [activeItem, setActiveItem] = React.useState<Models.Document>(posts[0]);

  const handleViewableItemsChange = ({
    viewableItems,
  }: {
    viewableItems: Array<{ item: Models.Document; key: string }>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={handleViewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      horizontal
    />
  );
};

export default Trending;
