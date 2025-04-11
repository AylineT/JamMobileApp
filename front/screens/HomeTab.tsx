import React, { useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import { Platform } from 'react-native'
import { YStack, Text, Input, Button, XStack } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'
import { JamMap } from '../components/organisms/JamMap'
import type { LocationObjectCoords } from 'expo-location'
import type { Jam } from '../components/atoms/Jam'
import MapView from 'react-native-maps'
import jamService from '@/services/jamService'

export const HomeTab = () => {
  const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRecentering, setIsRecentering] = useState(false)
  const mapRef = useRef<MapView>(null)

  const [jams, setJams] = useState<Jam[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getJams = async () => {
      try {
        setLoading(true);
        setError('');
        const events = await jamService.getAllJams();
        setJams(events)
      } catch (err) {
        console.error('Login failed:', err);
        setError('Invalid email or password');
      } finally {
        setLoading(false);
      }
    };

    getJams()
  }, [])

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg("Pas compatible avec l'émulateur Android")
        return
      }

      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission refusée')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setUserLocation(location.coords)
    }

    getCurrentLocation()
  }, [])

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    if (!userLocation) return
    const filtered = jams.filter((jam) => {
      const inSearch = jam.title.toLowerCase().includes(searchQuery.toLowerCase())
      const dist = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        jam.location.latitude,
        jam.location.longitude
      )
      return inSearch && dist <= 1
    })
    setJams(filtered)
  }, [searchQuery, userLocation])

  const handleRecenter = async () => {
    setIsRecentering(true)

    try {
      if (userLocation && mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        )
      } else {
        const location = await Location.getCurrentPositionAsync({})
        setUserLocation(location.coords)
        mapRef.current?.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        )
      }
    } catch (err) {
      console.warn('Erreur de recentrage :', err)
    } finally {
      setTimeout(() => setIsRecentering(false), 1200)
    }
  }

  return (
    <YStack flex={1} position="relative" overflow="hidden">
      {userLocation ? (
        <>
          {/* 🔍 Searchbar */}
          <YStack paddingHorizontal={4} paddingTop={6} position="absolute" top={0} zIndex={2} width="100%">
            <XStack
              alignItems="center"
              gap={2}
              paddingHorizontal={1}
              paddingVertical={8}
              backgroundColor="white"
              borderRadius={10}
              elevation={3}
              shadowColor="black"
              shadowOpacity={0.08}
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
            >
              <Search size={1} color="black" />
              <Input
                unstyled
                placeholder="Rechercher un jam à proximité..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                fontSize="$4"
                flex={5}
                color="$black"
                placeholderTextColor="#999"
              />
            </XStack>
          </YStack>

          {/* 🗺️ Map */}
          <JamMap userLocation={userLocation} jams={jams} mapRef={mapRef} />

          {/* 📍 Recenter button */}
          <Button
            position="absolute"
            bottom={20}
            right={20}
            zIndex={3}
            borderRadius={10}
            height={50}
            backgroundColor="white"
            width={50}
            onPress={handleRecenter}
            disabled={isRecentering}
            fontSize={20}
          >
            {isRecentering ? '⏳' : '📍'}
          </Button>
        </>
      ) : (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Text>Chargement de ta localisation...</Text>
          {errorMsg && <Text color="red">{errorMsg}</Text>}
        </YStack>
      )}
    </YStack>
  )
}

