import CustomCard from "@/components/card";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";

export default function Notifications() {
  const [cards, setCards] = useState([
    {
      title: "Payment Received",
      description: "Payment received for AI Agent.",
      iconName: "notifications",
      iconColor: "white",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => [
        ...prevCards,
        {
          title: "Payment Received",
          description: "Payment received for AI Agent.",
          iconName: "notifications",
          iconColor: "white",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="flex-row mt-12 top-4 left-4 mb-12 relative">
        <View className="flex-row">
          <Text className="text-white text-3xl font-bold">Notifications</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 4, gap: 16 }}>
        {cards.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            description={`${card.description} - Received at: ${card.time}`}
            iconName={card.iconName}
            iconColor={card.iconColor}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
