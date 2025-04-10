import React from 'react'
import { TamaguiProvider, Theme } from 'tamagui'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { render } from '@testing-library/react-native'
import { config } from '../tamagui.config'
import Index from '../app/index'

export function renderWithTamagui(ui: React.ReactElement) {
  return render(
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Theme name="dark">
          <Index/> 
        </Theme>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}