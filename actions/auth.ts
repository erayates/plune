import client from "@/lib/appwrite";
import { ToastAndroid } from "react-native";
import { Account } from "react-native-appwrite";

const account = new Account(client);

export async function signIn(data: { email: string; password: string }) {
  try {
    const { email, password } = data;
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) {
      ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT);
    return session;
  } catch {
    ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
  }
}
