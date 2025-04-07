import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoTitle}>
        🎵 Musicians <Text style={styles.logoHighlight}>Network</Text>
      </Text>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>S’inscrire</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoTitle: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 50,
    fontWeight: 'bold',
  },
  logoHighlight: {
    color: '#00aaff',
  },
  loginButton: {
    backgroundColor: '#007bff',
    width: '80%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#eee',
    width: '80%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#111',
    fontWeight: 'bold',
  },
});
