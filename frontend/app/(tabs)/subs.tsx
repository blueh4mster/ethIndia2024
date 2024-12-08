import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomCard from "@/components/card";

export default function Subs() {
  const [selectedTab, setSelectedTab] = useState("currentAgents");

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="mt-12 top-4 left-4">
        <View className="flex-row">
          <Text className="text-white text-3xl font-bold">Agents</Text>
        </View>
      </View>

      <View className="flex-row justify-around mt-12">
        <TouchableOpacity
          onPress={() => setSelectedTab("currentAgents")}
          style={{
            borderBottomWidth: selectedTab === "currentAgents" ? 2 : 0,
            borderColor: "white",
            paddingBottom: 5,
          }}
        >
          <Text className="text-white text-lg">Current Agents</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("allAgents")}
          style={{
            borderBottomWidth: selectedTab === "allAgents" ? 2 : 0,
            borderColor: "white",
            paddingBottom: 5,
          }}
        >
          <Text className="text-white text-lg">All Agents</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8">
        {selectedTab === "currentAgents" ? (
          <View className="flex-row p-4 gap-4">
            <CustomCard
              title="AI Agent"
              description="Navigate to the home screen."
              iconName="home"
              iconColor="white"
              containerStyle="flex-1"
            />
          </View>
        ) : (
          <View className="flex-row p-4 gap-4">
            <CustomCard
              title="AI Agent"
              description="Navigate to the home screen."
              iconName="home"
              iconColor="white"
              containerStyle="flex-1"
            />
            <CustomCard
              title="Trading"
              description="Manage your preferences."
              iconName="settings"
              iconColor="white"
              containerStyle="flex-1"
            />
          </View>
        )}
      </View>

      <StatusBar backgroundColor="#161662" style="light" />
    </SafeAreaView>
  );
}
