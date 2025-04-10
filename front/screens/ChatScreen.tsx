import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { YStack, XStack, Button, Input } from 'tamagui'
import { useLocalSearchParams } from 'expo-router'

import { useAuthStore } from '../store/authStore'
import {
  getMessagesByConversation,
  sendMessageToConversation
} from '../services/messagesServices'
import { MessageBubble } from '../components/molecules/MessageBubble'
import { io } from 'socket.io-client'

const socket = io('http://192.168.1.60:8000', {
  transports: ['websocket'],
  autoConnect: false,
})

export default function ChatScreen() {
  const { conversationId, receiverId } = useLocalSearchParams()
  const { user, accessToken } = useAuthStore()
  const [messages, setMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState('')
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (!socket.connected) socket.connect()
    socket.emit('join_conversation', conversationId)

    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage])
    })

    return () => {
      socket.off('receive_message')
      socket.disconnect()
    }
  }, [conversationId])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByConversation(conversationId as string, accessToken)
        setMessages(data)
      } catch (err) {
        console.error('Erreur chargement messages', err)
      }
    }

    fetchMessages()
  }, [])

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return

    const newMessage = {
      content: messageInput,
      sender_id: user.id,
      receiver_id: Number(receiverId),
      conversation_id: Number(conversationId),
    }

    try {
      const savedMessage = await sendMessageToConversation(newMessage, accessToken)
      socket.emit('send_message', savedMessage)
      setMessages((prev) => [...prev, savedMessage])
      setMessageInput('')
    } catch (error) {
      console.error('Erreur envoi message :', error)
    }
  }

  return (
    <YStack f={1} p="$3">
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MessageBubble
            message={item.content}
            isOwnMessage={item.sender_id === user.id}
          />
        )}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <XStack mt="$3" gap="$2" ai="center">
        <Input
          flex={1}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Votre message..."
        />
        <Button onPress={handleSendMessage}>Envoyer</Button>
      </XStack>
    </YStack>
  )
}
