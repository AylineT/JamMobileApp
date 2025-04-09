import React, { useState } from 'react'
import { YStack, Text } from 'tamagui'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import LogoTitle from '@/components/molecules/LogoTitle'
import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import ThirdPartyButton from '@/components/molecules/ThirdPartyButton'
import LinkText from '@/components/atoms/LinkText'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = () => {
    const emailRegex = /\S+@\S+\.\S+/

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Tous les champs sont obligatoires.')
      return
    }

    if (!emailRegex.test(email)) {
      setError('Adresse mail invalide.')
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    // Nettoyage
    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    // Appel à l’API backend (à faire)
    console.log('Inscription avec :', cleanEmail, cleanPassword)
    setError('')
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
        icon={<AntDesign name="google" size={20} color="black" />}
        text="S’inscrire avec Google"
        onPress={() => console.log('Inscription Google')}
      />

      <ThirdPartyButton
        icon={<Ionicons name="logo-apple" size={20} color="black" />}
        text="S’inscrire avec Apple"
        onPress={() => console.log('Inscription Apple')}
      />

      <LinkText
        label="Déjà inscrit ?"
        linkText="Se connecter"
        linkHref="/login"
      />
    </YStack>
  )
}
