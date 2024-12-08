import { Tabs } from "expo-router";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "#333",
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="agents"
          options={{
            title: "Agents",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="person"
                size={24}
                color={focused ? "white" : color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="subs"
          options={{
            title: "Subscriptions",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="power"
                size={24}
                color={focused ? "white" : color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="notifications"
                size={24}
                color={focused ? "white" : color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
