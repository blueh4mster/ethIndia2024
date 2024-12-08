import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import CustomButton from "@/components/customButton";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "expo-router";

export default function Add() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [formData, setFormData] = useState({
    to: "",
    amount: "",
  });

  const [open, setOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [durationValue, setDurationValue] = useState(null);
  const [items, setItems] = useState([
    { label: "sec", value: "10 sec" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ]);
  const [duration, setDuration] = useState([
    { label: "1 Month", value: "1_month" },
    { label: "3 Months", value: "3_months" },
    { label: "6 Months", value: "6_months" },
    { label: "1 Year", value: "1_year" },
  ]);

  const handlePayNow = () => {
    const getAllAssets = async () => {
      const options = {
        method: "GET",
        url: `${process.env.API_BASE_URL}/api/assets`,
        params: {
          blockchain: chain,
        },
      };

      try {
        const response = await axios.request(options);

        if (response.data && response.data.status === "SUCCESS") {
          router.push("/subs");
        }
      } catch (err) {
        console.error({ "error refresh": err });
      }
    };
  };

  const renderItem = () => (
    <View className="px-4 mt-24">
      <View className="mb-4">
        <Text className="text-white text-xl mb-2">To</Text>
        <TextInput
          className="text-white p-4 rounded-xl"
          style={{
            borderWidth: 1,
            borderColor: "white",
          }}
          placeholder="Recipient Address"
          placeholderTextColor="gray"
          value={formData.to}
          onChangeText={(value) =>
            setFormData((prevState) => ({ ...prevState, to: value }))
          }
        />
      </View>
      <View className="mb-4">
        <Text className="text-white text-xl mb-2">Amount</Text>
        <TextInput
          className="text-white p-4 rounded-xl"
          style={{
            borderWidth: 1,
            borderColor: "white",
          }}
          placeholder="Amount (e.g., 100 USDT)"
          placeholderTextColor="gray"
          value={formData.amount}
          onChangeText={(value) =>
            setFormData((prevState) => ({ ...prevState, amount: value }))
          }
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text className="text-white text-xl mb-2">Interval</Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Select an interval"}
            style={{
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "transparent",
              zIndex: 3,
            }}
            dropDownContainerStyle={{
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "#6552FE",
              zIndex: 3,
            }}
            textStyle={{
              color: "white",
            }}
            arrowIconStyle={{
              tintColor: "white",
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text className="text-white text-xl mb-2">Duration</Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <DropDownPicker
            open={durationOpen}
            value={durationValue}
            items={duration}
            setOpen={setDurationOpen}
            setValue={setDurationValue}
            setItems={setDuration}
            placeholder={"Select a duration"}
            style={{
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "transparent",
              zIndex: 2,
            }}
            dropDownContainerStyle={{
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "#6552FE",
              zIndex: 1,
            }}
            textStyle={{
              color: "white",
            }}
            arrowIconStyle={{
              tintColor: "white",
            }}
          />
        </View>
      </View>

      <View className="relative -bottom-20 left-0 right-0 items-center">
        <CustomButton
          title="Continue"
          outline={false}
          handlePress={handlePayNow}
          containerstyle="min-w-[340px]"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="mt-12 top-4 left-4">
        <View className="flex-row">
          <Text className="text-white text-3xl font-bold">
            Add Subscription
          </Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          marginBottom: 80,
        }}
        data={[1]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
      />

      <StatusBar backgroundColor="#161662" style="light" />
    </SafeAreaView>
  );
}
