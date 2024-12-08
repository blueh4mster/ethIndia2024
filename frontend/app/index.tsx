import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import CustomButton from "@/components/customButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import LandingImage from "@/assets/images/Shape.png";

export default function App() {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center">
          <View className="flex-row p-4 mt-8">
            <Text className="text-white text-6xl font-bold">Fortress</Text>
            <Text className="text-purple text-6xl font-bold">AI</Text>
          </View>
          <View className="mt-4 relative left-16">
            <Image
              source={LandingImage}
              className="w-84 h-84"
              resizeMode="contain"
            />
          </View>
          <View className="p-4 -mt-6">
            <Text className="text-white text-3xl font-bold">
              Welcome to the{"\n"}future of AI agents
            </Text>
          </View>
          <View className="p-4 -mt-4">
            <Text className="text-white text-xl">
              Trustless AI agents{"\n"}that run inside TEEs
            </Text>
          </View>
          <View className="items-center mt-8">
            <CustomButton
              title="Get Started"
              outline={false}
              handlePress={() => router.push("/setup")}
              containerstyle="min-w-[340px]"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161662" style="light" />
    </SafeAreaView>
  );
}
