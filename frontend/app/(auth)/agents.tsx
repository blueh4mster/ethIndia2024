import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import CustomCard from "@/components/card";
import { Redirect, router } from "expo-router";

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleContinue = () => {
    if (selectedCard === "AI Agent") {
      router.push("/add");
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="mt-12 top-4 left-4 mb-12">
        <View className="flex-row">
          <Text className="text-white text-5xl font-bold">Choose</Text>
          <Text className="text-purple text-5xl font-bold">Agents</Text>
        </View>
      </View>

      <View className="flex-row p-4 gap-4">
        <CustomCard
          title="AI Agent"
          description="Navigate to the home screen."
          iconName="home"
          iconColor="white"
          outline={selectedCard !== "AI Agent"}
          handlePress={() => setSelectedCard("AI Agent")}
          containerStyle="flex-1"
        />
        <CustomCard
          title="Trading"
          description="Manage your preferences."
          iconName="settings"
          iconColor="white"
          outline={selectedCard !== "Trading"}
          handlePress={() => setSelectedCard("Trading")}
          containerStyle="flex-1"
        />
      </View>

      <View className="absolute bottom-8 left-0 right-0 items-center">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleContinue}
          disabled={!selectedCard}
          className={`rounded-xl min-w-[340px] min-h-[50px] justify-center items-center ${
            selectedCard ? "bg-purple" : "bg-gray-500"
          }`}
        >
          <Text className="text-white text-2xl p-4">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
