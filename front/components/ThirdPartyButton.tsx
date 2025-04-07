import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type Props = {
  icon: ReactNode;
  text: string;
  onPress: () => void;
};

export default function ThirdPartyButton({ icon, text, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.row}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  text: {
    color: "#000",
    marginLeft: 10,
    fontWeight: "600",
  },
});
