import React from "react";
import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

type Props = {
  label: string;
  linkText: string;
  linkHref: string;
};

export default function LinkText({ label, linkText, linkHref }: Props) {
  return (
    <Text style={styles.footerText}>
      {label}{" "}
      <Link href={linkHref}>
        <Text style={styles.link}>{linkText}</Text>
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  footerText: {
    color: "#ccc",
    marginTop: 20,
  },
  link: {
    color: "#00aaff",
    fontWeight: "bold",
  },
});
