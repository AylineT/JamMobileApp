import React, { useState } from 'react'
import { ScrollView, YStack, XStack, Text } from 'tamagui'
import { useRouter } from 'expo-router'

import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import DateTimeField from '@/components/molecules/DateTimeField'

export default function JamsTab() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!title || !location) {
      setError("Les champs 'Nom' et 'Lieu' sont obligatoires.")
      return
    }

    setError('')
    console.log({
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description,
    })
  }

  return (
    <ScrollView background="black" flex={1} padding="$md">
      <YStack space="$lm" marginTop="$md">
        <Text fontSize="$6" color="$white" textAlign="center" fontWeight="bold">
          Organiser un événement
        </Text>

        {error.length > 0 && (
          <Text color="red" textAlign="center">{error}</Text>
        )}

        <CustomInput placeholder="Nom de l'événement" value={title} onChangeText={setTitle} />

        <XStack space="$lm">
          <YStack flex={1}>
            <DateTimeField label="Début" mode="date" value={startDate} onChange={setStartDate} />
            <DateTimeField label="" mode="time" value={startTime} onChange={setStartTime} />
          </YStack>
          <YStack flex={1}>
            <DateTimeField label="Fin" mode="date" value={endDate} onChange={setEndDate} />
            <DateTimeField label="" mode="time" value={endTime} onChange={setEndTime} />
          </YStack>
        </XStack>

        <CustomInput placeholder="Lieu de l'événement" value={location} onChangeText={setLocation} />
        <CustomInput placeholder="Description" value={description} onChangeText={setDescription} />

        <XStack space="$lm" marginTop="$md">
          <YStack flex={1}>
            <CustomButton text="Annuler" variant="secondary" onPress={() => router.back()} />
          </YStack>
          <YStack flex={1}>
            <CustomButton text="Valider" onPress={handleSubmit} />
          </YStack>
        </XStack>
      </YStack>
    </ScrollView>
  )
}
