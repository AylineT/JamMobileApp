import { Text } from 'tamagui'

type Props = {
  size?: number
}

export default function LogoTitle({ size = 24 }: Props) {
  return (
    <Text fontSize={size} fontWeight="bold" color="$primary" marginBottom={25} textAlign="center">
      🎵 Musicians <Text color="$white">Network</Text>
    </Text>
  )
}
