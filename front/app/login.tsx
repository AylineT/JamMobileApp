import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import LogoTitle from "../components/LogoTitle";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ThirdPartyButton from "../components/ThirdPartyButton";
import LinkText from "../components/LinkText";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Tu peux aussi ajouter une vérification de format d'email :
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Adresse mail invalide.");
      return;
    }

    // Nettoyage basique
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // TODO: Envoyer vers backend
    setError(""); // reset
    console.log("Login avec:", cleanEmail, cleanPassword);
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

      <CustomButton text="Continuer" onPress={handleLogin} />

      <ThirdPartyButton
        icon={<AntDesign name="google" size={20} color="#000" />}
        text="Se connecter avec Compte Google"
        onPress={() => console.log("Google login")}
      />
      <ThirdPartyButton
        icon={<Ionicons name="logo-apple" size={20} color="#000" />}
        text="Se connecter avec Compte Apple"
        onPress={() => console.log("Apple login")}
      />

      <LinkText
        label="Pas de compte ?"
        linkText="Inscrivez-vous"
        linkHref="/register"
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
