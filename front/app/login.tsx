import React, { useState } from 'react'
import { YStack, Text } from 'tamagui'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router';

import userService from '@/services/userService';

import LogoTitle from '@/components/molecules/LogoTitle'
import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import ThirdPartyButton from '@/components/molecules/ThirdPartyButton'
import LinkText from '@/components/atoms/LinkText'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await userService.login({ email, password });
      navigation.navigate('home')
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" background="black" padding="$lm">
      <LogoTitle size={28} />

      {error.length > 0 && (
        <Text color="red" marginBottom="5%">
          {error}
        </Text>
      )}

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
        icon={<AntDesign name="google" size={20} color="$black" />}
        text="Se connecter avec Compte Google"
        onPress={() => console.log('Connexion Google')}
      />

      <ThirdPartyButton
        icon={<Ionicons name="logo-apple" size={20} color="black" />}
        text="Se connecter avec Compte Apple"
        onPress={() => console.log('Connexion Apple')}
      />

      <LinkText
        label="Pas de compte ?"
        linkText="Inscrivez-vous"
        linkHref="/register"
      />
    </YStack>
  )
}
