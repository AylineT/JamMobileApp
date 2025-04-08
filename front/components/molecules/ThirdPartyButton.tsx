import { Button, XStack, Text } from 'tamagui'
import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  text: string
  onPress: () => void
}

export default function ThirdPartyButton({ icon, text, onPress }: Props) {
  return (
    <Button
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        width: "100%",
        padding: 8,
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <XStack alignItems="center" justifyContent="center" >
        {icon}
        <Text style={{ color: "#000", marginLeft: 10, fontWeight: "700" }}>
          {text}
        </Text>
      </XStack>
    </Button>
  )
}

