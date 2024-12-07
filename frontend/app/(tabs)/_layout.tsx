import { Tabs, Redirect } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="home"
              size={24}
              color={focused ? "tomato" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={24}
              color={focused ? "tomato" : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="add"
              size={24}
              color={focused ? "tomato" : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="history"
              size={24}
              color={focused ? "tomato" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="person"
              size={24}
              color={focused ? "tomato" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
