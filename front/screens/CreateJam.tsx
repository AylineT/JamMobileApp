import React, { useState } from 'react'
import { ScrollView, YStack, XStack, Text } from 'tamagui'
import { useRouter } from 'expo-router'
import { getHours, getMinutes, set } from 'date-fns'

import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import DateTimeField from '@/components/molecules/DateTimeField'
import jamService from '@/services/jamService'

export const CreateJam = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState(new Date())
  const [error, setError] = useState('')

  const event_date = set(eventDate, {
    hours: getHours(eventTime),
    minutes: getMinutes(eventTime)
  }).toISOString()

  const handleSubmit = async () => {
    if (!title || !location) {
      setError("Les champs 'Nom' et 'Lieu' sont obligatoires.")
      return
    }

    try {
      setError('');
      await jamService.createJam({ title, event_date, location, description })
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      console.log("done")
    }

    setError('')
  }

  return (
    <ScrollView backgroundColor="$black" flex={1} padding="$md">
      <YStack space="$lm" marginTop="$md">
        <Text fontSize="$6" color="$white" textAlign="center" fontWeight="bold">
          Organiser un événement
        </Text>

        {error.length > 0 && (
          <Text color="red" textAlign="center">{error}</Text>
        )}

        <CustomInput placeholder="Nom de l'événement" value={title} onChangeText={setTitle} />

        <XStack flex={1} gap={12} justifyContent='space-between'>
          <DateTimeField label="Date" mode="date" value={eventDate} onChange={setEventDate} />
          <DateTimeField label="Heure" mode="time" value={eventTime} onChange={setEventTime} />
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
