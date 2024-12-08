import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import CustomButton from "@/components/customButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import walletImage from "@/assets/images/illustration.png";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const projectId = "1a8df8683f08d030a6ec2c6b7277152c";
const providerMetadata = {
  name: "TacoGalaxy",
  description:
    "WalletConnect is an open protocol for connecting desktop Dapps to mobile Wallets using end-to-end encryption by scanning a QR code.",
  url: "https://TacoGalaxy.org",
  icons: ["https://walletconnect.org/TacoGalaxy-logo.png"],
  redirect: {
    native: "TacoGalaxy://",
    universal: "https://TacoGalaxy.org",
  },
};

export default function setUp() {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  const handlePressButton = async () => {
    if (isConnected) {
      router.push("/agents");
      return provider?.disconnect();
    }
    return open();
  };

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
            {/* <View>
              <Text className="text-white">
                {isConnected ? address : "not connected"}
              </Text>
            </View> */}
            <CustomButton
              title={
                isConnected
                  ? `${address.substring(0, 8)}... >`
                  : "Connect Wallet"
              }
              outline={false}
              handlePress={handlePressButton}
              containerstyle="min-w-[340px]"
            />
            <WalletConnectModal
              projectId={projectId}
              providerMetadata={providerMetadata}
            />
            {/* <CustomButton
              title="Choose Agent"
              outline={true}
              handlePress={() => router.push("/agents")}
              containerstyle="min-w-[340px]"
            /> */}
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#6552FE" style="light" />
    </SafeAreaView>
  );
}
