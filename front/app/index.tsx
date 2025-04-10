import LogoTitle from '@/components/molecules/LogoTitle'
import CustomLinkButton from '@/components/atoms/CustomLinkButton'
import { YStack } from 'tamagui';

export default function Index() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$black" padding="$md">
      <LogoTitle size={30} />

      <CustomLinkButton text="Se connecter" href="/login" />
      <CustomLinkButton text="S’inscrire" href="/register" variant="secondary" />
      <CustomLinkButton text="accéder à la home" href="/home" variant="secondary" />

    </YStack>
  )
}
