import { useEffect } from 'react'
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native'
import { useNavigation } from 'expo-router'
import { useChatStore } from '../store/chatStore'

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
    <View style={styles.container}>
      <Text style={styles.title}>💬 Tes Conversations</Text>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => goToChat(item.id)} style={styles.item}>
            <Text style={styles.jamText}>🎤 Jam #{item.jam_id}</Text>
            <Text style={styles.userText}>Avec : {item.user2.username}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  jamText: {
    fontSize: 16,
    fontWeight: '600',
  },
  userText: {
    color: '#666',
    marginTop: 4,
  },
})
