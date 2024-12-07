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
            <Text className="text-white text-6xl font-bold">Taco</Text>
            <Text className="text-violet text-6xl font-bold">Galaxy</Text>
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
              Welcome to the{"\n"}future of wallets
            </Text>
          </View>
          <View className="p-4 -mt-4">
            <Text className="text-white text-xl">
              Take your crypto exchanges{"\n"}to the next level
            </Text>
          </View>
          <View className="items-center mt-8">
            <CustomButton
              title="Get Started"
              outline={false}
              handlePress={() => router.push("/sign-in")}
              containerstyle="min-w-[340px]"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161662" style="light" />
    </SafeAreaView>
  );
}
