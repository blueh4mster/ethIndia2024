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
                name="add-circle-outline"
                size={24}
                color={focused ? "white" : color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="subs"
          options={{
            title: "Subs",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="home"
                size={24}
                color={focused ? "white" : color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="trading"
          options={{
            title: "Trading",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="history"
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
