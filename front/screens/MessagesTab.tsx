import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { MessageBubble } from '../components/molecules/MessageBubble'
import { useUserStore } from '../store/userStore'
import { useMessageStore } from '../store/messageStore'
import { SOCKET_URL } from '../utils/constants'

export const MessagesTab = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const { currentUser } = useUserStore()
  const { messages, addMessage } = useMessageStore()

  const [text, setText] = useState('')
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!currentUser?.id) return

    const socket = new WebSocket(`${SOCKET_URL}/ws/chat/${currentUser.id}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('✅ WebSocket connected')
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        addMessage(data)
      } catch (err) {
        console.error('Erreur parsing WS message:', err)
      }
    }

    socket.onerror = (e) => {
      console.error('WebSocket error:', e)
    }

    socket.onclose = () => {
      console.log('❌ WebSocket disconnected')
    }

    return () => {
      socket.close()
    }
  }, [currentUser])

  const sendMessage = () => {
    if (text.trim() !== '' && socketRef.current?.readyState === 1) {
      const message = {
        senderId: currentUser.id,
        content: text,
        createdAt: new Date().toISOString(),
      }
      socketRef.current.send(JSON.stringify(message))
      addMessage(message)
      setText('')
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <TextInput
          placeholder="Tape ton message..."
          value={text}
          onChangeText={setText}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            paddingHorizontal: 15,
            height: 40,
          }}
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  )
}
