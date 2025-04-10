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
      
      backgroundColor="$white"
      width={"100%"}
      padding="$sm"
      borderRadius="$sm"
      marginBottom="$lg"
    >
      <XStack alignItems="center" justifyContent="center" >
        {icon}
        <Text 
        color="$black" 
        marginLeft="$md"
        fontSize="$md"
        fontWeight="bold">
          {text}
        </Text>
      </XStack>
    </Button>
  )
}

