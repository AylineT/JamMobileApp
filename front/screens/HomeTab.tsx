import React, { useEffect, useState } from 'react'
import { YStack } from 'tamagui'
import MapView, { Marker, Callout } from 'react-native-maps'
import { StyledCard } from '../components/atoms/StyledCard'
import { Jam, useNavigationStore } from "@/store/navigationStore";
import jamService from '@/services/jamService';

export const HomeTab = () => {
  const [jams, setJams] = useState<Jam[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const { setActiveTab, setJam } = useNavigationStore();

  const onPress = (jam: Jam) => {
    console.log("ok")
    setActiveTab("jamsDetails")
    setJam(jam)
  }

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

  return (
    <YStack flex={1}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.8719,
          longitude: 2.3359,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {jams.map((jam) => {
          const {id, location} = jam
          const { label, ...coordinates } = location;
          return (
            <Marker key={id} coordinate={coordinates}>
              <Callout tooltip>
                <StyledCard jam={jam} onPress={() => onPress(jam)}/>
              </Callout>
            </Marker>
            )
          })
        }
      </MapView>
    </YStack>
  )
}
