import React from 'react'
import { Text, View } from 'react-native'
import { useUserStore } from '../../store/userStore'

interface MessageBubbleProps {
  message: {
    content: string
    senderId: number
    createdAt: string
  }
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { currentUser } = useUserStore()
  const isOwnMessage = message.senderId === currentUser.id

  return (
    <View
      style={{
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isOwnMessage ? '#0086FF' : '#E5E5EA',
        borderRadius: 10,
        padding: 10,
        marginVertical: 4,
        maxWidth: '80%',
      }}
    >
      <Text style={{ color: isOwnMessage ? 'white' : 'black' }}>
        {message.content}
      </Text>
      <Text
        style={{
          fontSize: 10,
          marginTop: 5,
          color: isOwnMessage ? '#cce6ff' : '#666',
          alignSelf: 'flex-end',
        }}
      >
        {new Date(message.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  )
}
