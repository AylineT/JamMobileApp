import React from 'react'
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { Stack } from 'expo-router'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Stack />
    </TamaguiProvider>
  )
}
