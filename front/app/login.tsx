import React, { useState } from 'react'
import { View } from 'react-native'
import { YStack, Text } from 'tamagui'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import LogoTitle from '@/components/molecules/LogoTitle'
import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import ThirdPartyButton from '@/components/molecules/ThirdPartyButton'
import LinkText from '@/components/atoms/LinkText'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs.')
      return
    }

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      setError('Adresse mail invalide.')
      return
    }

    setError('')
    console.log('Connexion :', email, password)
  }

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
