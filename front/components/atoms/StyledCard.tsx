import React, { ReactNode } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

interface StyledCardProps {
  title: string
  onPress?: () => void
  children?: ReactNode
}

export const StyledCard: React.FC<StyledCardProps> = ({ title, onPress, children }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://source.unsplash.com/400x200/?music' }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>{title}</Text>

      <View>{children}</View>

      {onPress && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Voir le détail</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    width: 220,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  image: {
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#0086FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
})
