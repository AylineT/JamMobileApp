import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import LogoTitle from "../components/LogoTitle";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ThirdPartyButton from "../components/ThirdPartyButton";
import LinkText from "../components/LinkText";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Adresse mail invalide.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // TODO: Envoyer vers le backend
    console.log("Inscription avec:", cleanEmail, cleanPassword);
    setError(""); // reset erreur
  };

  return (
    <View style={styles.container}>
      <LogoTitle size={26} />

      {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

      <CustomInput
        placeholder="Adresse mail"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomInput
        placeholder="Confirmer mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <CustomButton text="Créer mon compte" onPress={handleRegister} />

      <ThirdPartyButton
        icon={<AntDesign name="google" size={20} color="#000" />}
        text="S’inscrire avec Google"
        onPress={() => console.log("Google register")}
      />
      <ThirdPartyButton
        icon={<Ionicons name="logo-apple" size={20} color="#000" />}
        text="S’inscrire avec Apple"
        onPress={() => console.log("Apple register")}
      />

      <LinkText
        label="Déjà inscrit ?"
        linkText="Se connecter"
        linkHref="/login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
});
