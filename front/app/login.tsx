import { Link } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoTitle}>
        🎵 Musicians <Text style={styles.logoHighlight}>Network</Text>
      </Text>

      <TextInput placeholder="Adresse mail" style={styles.input} placeholderTextColor="#999" />
      <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} placeholderTextColor="#999" />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={20} color="#000" />
        <Text style={styles.thirdPartyText}> Se connecter avec Compte Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <Ionicons name="logo-apple" size={20} color="#000" />
        <Text style={styles.thirdPartyText}> Se connecter avec Compte Apple</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Pas de compte ?{" "}
        <Link href="/register">
          <Text style={styles.link}>Inscrivez-vous</Text>
        </Link>
      </Text>
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
  logoTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
  },
  logoHighlight: {
    color: "#00aaff",
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#222",
    marginBottom: 15,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#007bff",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
  thirdPartyText: {
    color: "#000",
    marginLeft: 10,
    fontWeight: "600",
  },
  footerText: {
    color: "#ccc",
    marginTop: 20,
  },
  link: {
    color: "#00aaff",
    fontWeight: "bold",
  },
});
