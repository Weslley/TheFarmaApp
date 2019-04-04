import firebase from "react-native-firebase";
import type { RemoteMessage } from "react-native-firebase";
import type { Notification, NotificationOpen } from "react-native-firebase";

export default async (message: RemoteMessage) => {
  console.log("Message=>", message);
  alert("Message Arrived");
  return Promise.resolve();
};
