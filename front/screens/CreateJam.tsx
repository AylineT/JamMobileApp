import React, { useState } from 'react'
import { ScrollView, YStack, XStack, Text } from 'tamagui'
import { getHours, getMinutes, set } from 'date-fns'

import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'
import DateTimeField from '@/components/molecules/DateTimeField'
import AddressAutocomplete from '@/components/molecules/AddressAutocomplete';

import jamService from '@/services/jamService'
import { useNavigationStore } from '@/store/navigationStore'
import { Address } from '@/services/addressService';

interface JamFormData {
  title: string;
  description: string;
  event_date: string;
  time: string;
  location_id?: number;
}

export const CreateJam = () => {
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState(new Date())
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setActiveTab } = useNavigationStore();

  const event_date = set(eventDate, {
    hours: getHours(eventTime),
    minutes: getMinutes(eventTime)
  }).toISOString()

  const [formData, setFormData] = useState<JamFormData>({
    title: '',
    description: '',
    event_date: '',
    time: '',
    location_id: 1,
  });

  const handleChange = (value: string, fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleAddressSelected = (address: Address) => {
    setSelectedAddress(address);
    setFormData(prev => ({
      ...prev,
      location_id: address.id,
      event_date
    }));
  };


  const handleSubmit = async () => {
    if (!eventDate) {
      setError("Les champs 'Nom' et 'Lieu' sont obligatoires.")
      return
    }

    try {
      setIsLoading(true);
      setError('');
      const newJam = await jamService.createJam(formData);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      console.log("done")
      setActiveTab("jams");
      setIsLoading(false);
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

        <CustomInput
          label="Titre"
          placeholder="Titre de l'évènement"
          value={formData.title}
          onChangeText={(value) => handleChange(value, "title")}
        />

        <XStack flex={1} gap={12} justifyContent='space-between'>
          <DateTimeField label="Date" mode="date" value={eventDate} onChange={setEventDate} />
          <DateTimeField label="Heure" mode="time" value={eventTime} onChange={setEventTime} />
        </XStack>

        <CustomInput
          label="Description"
          type="textarea"
          placeholder="écrivez ici"
          value={formData.description}
          onChangeText={(value) => handleChange(value, "description")}
        />

        <AddressAutocomplete
          onAddressSelected={handleAddressSelected}
          placeholder="Saisissez l'adresse de la jam"
          limit={10}
          useCurrentLocation={true}
        />
        
        {selectedAddress && (
          <YStack marginTop="1%" marginBottom="2%">
            <Text fontSize="$3" color="$white">
              ✓ Adresse: {selectedAddress.label}
            </Text>
            <Text fontSize="$2" color="gray">
              {selectedAddress.city} ({selectedAddress.postcode})
            </Text>
          </YStack>
        )}
        
        <XStack space="$lm" marginTop="$md">
          <YStack flex={1}>
            <CustomButton text="Annuler" variant="secondary" onPress={() => setActiveTab("jams")} />
          </YStack>
          <YStack flex={1}>
            <CustomButton text="Valider" onPress={handleSubmit} />
          </YStack>
        </XStack>
      </YStack>
    </ScrollView>
  )
}
