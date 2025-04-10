import { useEffect } from 'react'
import { FlatList, Pressable } from 'react-native'
import { Text, View } from 'tamagui'
import { useNavigation } from 'expo-router'

export const ChatListScreen = () => {
  const navigation = useNavigation<any>()
  const { conversations, fetchConversations } = useChatStore()

  useEffect(() => {
    fetchConversations()
  }, [])

  const goToChat = (conversationId: number) => {
    navigation.push('/chat', { conversationId })
  }

  return (
    <View flex={1} padding={20} gap="$4">
      <Text fontWeight="bold" fontSize="$6">
        💬 Tes Conversations
      </Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => goToChat(item.id)}>
            <View
              padding={15}
              borderRadius={10}
              backgroundColor="$gray2"
              marginBottom={10}
            >
              <Text fontSize="$5">🎤 Jam #{item.jam_id}</Text>
              <Text color="$gray10">Avec : {item.user2.username}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}
