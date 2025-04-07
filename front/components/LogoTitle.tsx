import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
  size?: number;
};

export default function LogoTitle({ size = 24 }: Props) {
  return (
    <Text style={[styles.logoTitle, { fontSize: size }]}>
      🎵 Musicians <Text style={styles.logoHighlight}>Network</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logoTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  logoHighlight: {
    color: "#00aaff",
  },
});
