import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import CustomButton from "@/components/customButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import walletImage from "@/assets/images/illustration.png";

export default function setUp() {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <View className="mt-12 top-4 left-4">
            <View className="flex-row">
              <Text className="text-white text-5xl font-bold">Setup</Text>
              <Text className="text-purple text-5xl font-bold">Wallet</Text>
            </View>
          </View>

          <View className="mt-24 justify-center items-center">
            <Image
              source={walletImage}
              className="w-72 h-72"
              resizeMode="contain"
            />
          </View>

          <View className="relative left-0 right-0 items-center">
            <Text className="text-white text-xl text-center px-4">
              Take your crypto exchanges{"\n"}to the next level
            </Text>
          </View>

          <View className="absolute bottom-8 left-0 right-0 items-center">
            <CustomButton
              title="Connect Wallet"
              outline={false}
              handlePress={() => router.push("/setup")}
              containerstyle="min-w-[340px] mb-4"
            />
            <CustomButton
              title="Choose Agent"
              outline={true}
              handlePress={() => router.push("/agents")}
              containerstyle="min-w-[340px]"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#6552FE" style="light" />
    </SafeAreaView>
  );
}
