import MapView, { Marker, Callout } from 'react-native-maps'
import { JamCalloutCard } from '../molecules/JamCalloutCard'
import type { LocationObjectCoords } from 'expo-location'
import type { Jam } from '../atoms/Jam'
import { ForwardedRef, forwardRef } from 'react'

type JamMapProps = {
  userLocation: LocationObjectCoords
  jams: Jam[]
  mapRef: ForwardedRef<MapView>
}

export const JamMap = forwardRef<MapView, JamMapProps>(({ userLocation, jams, mapRef }, ref) => {
  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {jams.map((jam) => (
        <Marker key={jam.id} coordinate={jam.location}>
          <Callout tooltip>
            <JamCalloutCard
              title={jam.title}
              creator={jam.creator}
              genre={jam.genre}
              date={jam.date}
              onPress={() => {
                console.log('Go to jam detail', jam.id)
                
              }}
            />
          </Callout>
        </Marker>
      ))}
    </MapView>
  )
})
