import React, { useState } from 'react'
import { YStack, Text } from 'tamagui'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router';

import LogoTitle from '@/components/molecules/LogoTitle'
import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import ThirdPartyButton from '@/components/molecules/ThirdPartyButton'
import LinkText from '@/components/atoms/LinkText'
import userService from '@/services/userService';

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const navigation = useNavigation();

  const handleRegister = async () => {
    const emailRegex = /\S+@\S+\.\S+/

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Tous les champs sont obligatoires.')
      return
    } else if (!emailRegex.test(email)) {
      setError('Adresse mail invalide.')
      return
    } else if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    try {
      setLoading(true);
      setError('');
      await userService.register({ email, password, username });
      navigation.navigate('login')
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" background="black" padding="3%">
      <LogoTitle size={28} />

      {error.length > 0 && (
        <Text color="red" marginBottom="$-sm">
          {error}
        </Text>
      )}

      <CustomInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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

      {/* <ThirdPartyButton
        icon={<AntDesign name="google" size={20} color="black" />}
        text="S’inscrire avec Google"
        onPress={() => console.log('Inscription Google')}
      />

      <ThirdPartyButton
        icon={<Ionicons name="logo-apple" size={20} color="black" />}
        text="S’inscrire avec Apple"
        onPress={() => console.log('Inscription Apple')}
      /> */}

      <LinkText
        label="Déjà inscrit ?"
        linkText="Se connecter"
        linkHref="/login"
      />
    </YStack>
  )
}
