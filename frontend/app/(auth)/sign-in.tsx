import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import CustomButton from "@/components/customButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import walletImage from "@/assets/images/illustration.png";

export default function signIn() {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center">
          <View className="flex-row p-4 mt-24">
            <Text className="text-white text-6xl font-bold">Sign</Text>
            <Text className="text-purple text-6xl font-bold">In</Text>
          </View>
          <View className="mt-4 relative top-4 left-16">
            <Image
              source={walletImage}
              className="w-84 h-84"
              resizeMode="contain"
            />
          </View>
          <View className="p-4 -mt-12">
            <Text className="text-white text-3xl font-bold">
              Welcome to the{"\n"}future of wallets
            </Text>
          </View>
          <View className="p-4 -mt-4">
            <Text className="text-white text-xl">
              Take your crypto exchanges{"\n"}to the next level
            </Text>
          </View>
          <View className="items-center mb-8">
            <CustomButton
              title="Continue with Email"
              outline={false}
              handlePress={() => router.push("/setup")}
              containerstyle="min-w-[340px]"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#6552FE" style="light" />
    </SafeAreaView>
  );
}
