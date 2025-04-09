import { YStack } from 'tamagui'

import LogoTitle from '@/components/molecules/LogoTitle'
import CustomLinkButton from '@/components/atoms/CustomLinkButton'

export default function HomeScreen() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$black" padding="$md">
      <LogoTitle size={30} />

      <CustomLinkButton text="Se connecter" href="/login" />
      <CustomLinkButton text="S’inscrire" href="/register" variant="secondary" />
    </YStack>
  )
}
