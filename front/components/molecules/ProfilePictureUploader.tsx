import { View, Image, Pressable } from 'react-native'
import { Pencil } from '@tamagui/lucide-icons'
import { Text, YStack } from 'tamagui'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export default function ProfilePictureUploader() {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <YStack alignItems="center" marginBottom="2%">
      <Pressable onPress={pickImage}>
        <View style={{ position: 'relative' }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          ) : (
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#444',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pencil color="#aaa" />
            </View>
          )}

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 4,
            }}
          >
            <Pencil size={16} color="black" />
          </View>
        </View>
      </Pressable>
    </YStack>
  )
}
