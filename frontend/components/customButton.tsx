import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerstyle, outline }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`rounded-xl min-h-[50px] justify-center items-center ${
        outline ? "border-2 border-purple bg-transparent" : "bg-purple"
      } ${containerstyle}`}
    >
      <Text className={`text-2xl ${outline ? "text-white" : "text-white"} p-4`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
