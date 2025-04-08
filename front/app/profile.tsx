import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { YStack, Text, XStack } from 'tamagui'

import ProfilePictureUploader from '../components/molecules/ProfilePictureUploader'
import CustomInput from '../components/atoms/CustomInput'
import CustomButton from '../components/atoms/CustomButton'

export default function ProfileScreen() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [instruments, setInstruments] = useState('')
  const [influences, setInfluences] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = () => {
    if (!name.trim() || !description.trim() || !instruments.trim()) {
      setError('Veuillez remplir tous les champs obligatoires.')
      return
    }

    setError('')
    console.log({ name, description, instruments, influences })

    // Rediriger ou envoyer au backend
    // router.push('/home') si besoin
  }

  return (
    <YStack flex={1} background="black" padding="2%" justifyContent="center">
      <Text fontSize="$6" fontWeight="bold" color="$white" textAlign="center" marginBottom="2%">
        Créer votre profil
      </Text>

      <ProfilePictureUploader />

      {error.length > 0 && (
        <Text color="red" marginBottom="2%" textAlign="center">
          {error}
        </Text>
      )}

      <CustomInput placeholder="Nom de profil" value={name} onChangeText={setName} />
      <CustomInput placeholder="Description" value={description} onChangeText={setDescription} />
      <CustomInput placeholder="Instruments joués" value={instruments} onChangeText={setInstruments} />
      <CustomInput placeholder="Influences musicales" value={influences} onChangeText={setInfluences} />

      <XStack  space="2%" width="100%"  justifyContent="space-between" marginTop="5%">
        <YStack flex={1}>
            <CustomButton
            text="Annuler"
            variant="secondary"
            onPress={() => router.back()}
            />
        </YStack>

        <YStack flex={1}>
            <CustomButton
            text="Valider"
            onPress={handleSubmit}
            />
        </YStack>
      </XStack>
    </YStack>
  )
}
