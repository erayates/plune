import client, { config } from "@/lib/appwrite";
import { Alert } from "react-native";
import { Databases, Query } from "react-native-appwrite";

const databases = new Databases(client);

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    if (!posts) {
      Alert.alert(
        "ERROR!",
        "An error occurred when trying to fetch posts (videos.)"
      );
      return;
    }

    return posts.documents;
  } catch {
    Alert.alert("ERROR!", "INTERNAL SERVER ERROR!");
  }
}

export async function getUserPosts(userId: string) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    if (!posts) {
      Alert.alert(
        "ERROR!",
        "An error occurred when trying to fetch posts (videos.)"
      );
      return;
    }

    return posts.documents;
  } catch {
    Alert.alert("ERROR!", "INTERNAL SERVER ERROR!");
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );

    if (!posts) {
      Alert.alert(
        "ERROR!",
        "An error occurred when trying to fetch posts (videos.)"
      );
      return;
    }

    return posts.documents;
  } catch {
    Alert.alert("ERROR!", "INTERNAL SERVER ERROR!");
  }
}
