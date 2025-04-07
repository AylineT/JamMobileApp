import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export default function CustomButton({ text, onPress, variant = "primary" }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" ? styles.secondary : styles.primary]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === "secondary" && styles.textSecondary]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  primary: {
    backgroundColor: "#007bff",
  },
  secondary: {
    backgroundColor: "#eee",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  textSecondary: {
    color: "#111",
  },
});
