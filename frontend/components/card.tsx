import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const CustomCard = ({
  title,
  description,
  handlePress,
  containerStyle,
  outline,
  iconName,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`flex-row rounded-xl p-4 ${
        outline ? "border-2 border-purple bg-transparent" : "bg-purple"
      } ${containerStyle}`}
    >
      {iconName && (
        <View className="mr-4">
          <MaterialIcons
            name={iconName}
            size={24}
            color={iconColor || (outline ? "purple" : "white")}
          />
        </View>
      )}
      <View className="flex-1">
        <Text
          className={`text-lg font-bold ${
            outline ? "text-white" : "text-white"
          }`}
        >
          {title}
        </Text>
        {description && (
          <Text
            className={`mt-1 text-sm  ${outline ? "text-white" : "text-white"}`}
          >
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;
