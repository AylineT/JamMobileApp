import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'

const { width } = Dimensions.get('window')

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

export const HomeTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
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
              <View style={styles.card}>
                <Text style={styles.title}>{jam.title}</Text>
                <Text style={styles.creator}>Créé par {jam.créateur}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => console.log('Click sur jam', jam.id)}
                >
                  <Text style={styles.buttonText}>Voir le détail</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  creator: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0086FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
})
