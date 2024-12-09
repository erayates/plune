import client, { config } from "@/lib/appwrite";
import { Account, Avatars, Databases, ID } from "react-native-appwrite";

import { ToastAndroid } from "react-native";
import { signIn } from "./auth";

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const { username, email, password } = data;

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show("Account created successfully", ToastAndroid.SHORT);

    const avatarUrl = avatars.getInitials(username);

    const loginCredentials = {
      email,
      password,
    };

    await signIn(loginCredentials);

    await databases.createDocument(
      config.databaseId,
      config.userColectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar: avatarUrl,
        email,
        username,
      }
    );
  } catch {
    ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
  }
};