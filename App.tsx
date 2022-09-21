import { useEffect, useRef } from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { StatusBar, View } from "react-native";
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import * as Notifications from "expo-notifications";

import "./src/services/notificationConfigs";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";
import { Subscription } from "expo-modules-core";

export default function App() {
  const [fontsLoad] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black });
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("notification", notification);
    });
    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(
      (notification) => console.log("notification", notification)
    );

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    };
  }, []);
  return (
    <Background>
      <StatusBar barStyle={"light-content"} backgroundColor="transparent" translucent />
      {fontsLoad ? <Routes /> : <Loading />}
    </Background>
  );
}