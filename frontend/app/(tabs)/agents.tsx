import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import CustomCard from "@/components/card";
import { Redirect, router } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Agents() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleContinue = () => {
    if (selectedCard === "AI Agent") {
      router.push("/agents/add");
    } else {
      router.push("/notifications");
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="flex-row mt-12 top-4 left-4 mb-12 relative">
        <View className="flex-row">
          <Text className="text-white text-3xl font-bold">Choose</Text>
          <Text className="text-white text-3xl font-bold"> Agents</Text>
        </View>
        <View className="absolute top-0 right-8 bg-purple px-4 py-2 rounded-lg">
          <Text className="text-white">0x3086...</Text>
        </View>
      </View>

      <View className="flex-col p-4 gap-4">
        <CustomCard
          title="Recurring Payments"
          description="Automated recurring payments for subscription management."
          iconName="computer"
          iconColor="white"
          outline={selectedCard !== "AI Agent"}
          handlePress={() => setSelectedCard("AI Agent")}
        />
        <CustomCard
          title="Trading"
          description="A trading agent is an AI that automates trades, analyzing data to maximize profits."
          iconName="money"
          iconColor="white"
          outline={selectedCard !== "Trading"}
          handlePress={() => setSelectedCard("Trading")}
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
