import { Stack } from "expo-router";
import { TamaguiProvider, Theme } from 'tamagui';
import { config } from "@/tamagui.config";
import { useFonts } from 'expo-font'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require('@/assets/fonts/Inter.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark" >
        <Stack background="$bg"/>
      </Theme>
    </TamaguiProvider>
  )
}
