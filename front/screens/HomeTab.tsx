import React from 'react'
import { YStack, Text } from 'tamagui'
// import MapView, { Marker, Callout } from 'react-native-maps'
import { StyledCard } from '../components/atoms/StyledCard'

export const HomeTab = () => {
  const jams = [
    {
      id: 'jam-1',
      title: 'Jazz & Jam 🥁',
      créateur: 'DJ Snake',
      location: { latitude: 48.8719, longitude: 2.3359 },
    },
    {
      id: 'jam-2',
      title: 'Funk Session 🎸',
      créateur: '50 Cent',
      location: { latitude: 48.8689, longitude: 2.3369 },
    },
    {
      id: 'jam-3',
      title: 'Rock N’ Roll 🤘',
      créateur: 'Lady Gaga',
      location: { latitude: 48.8729, longitude: 2.3339 },
    },
  ]

  return (
    <YStack flex={1}>
      {/* <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.8719,
          longitude: 2.3359,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {jams.map((jam) => (
          <Marker key={jam.id} coordinate={jam.location}>
            <Callout tooltip>
              <StyledCard
                title={jam.title}
                onPress={() => {
                  console.log('Click sur jam', jam.id)
                  // ici tu pourras faire router.push(`/jam/${jam.id}`)
                }}
              >
                <Text fontSize="$2" marginTop={"$1" as any} color="black">
                  Créé par {jam.créateur}
                </Text>
              </StyledCard>
            </Callout>
          </Marker>
        ))}
      </MapView> */}
    </YStack>
  )
}
