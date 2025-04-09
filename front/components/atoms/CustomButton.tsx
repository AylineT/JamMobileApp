import { Button, Text } from 'tamagui'

type Props = {
  text: string
  onPress?: () => void // <- rendu optionnel
  variant?: 'primary' | 'secondary'
}

const CustomButton = ({ text, onPress, variant = 'primary' }: Props) => {
  return (
    <Button
      onPress={onPress} 
      backgroundColor={variant === 'primary' ? '$baba' : '$white'}
      color={variant === 'primary' ? '$white' : '$black'}
      width="100%"
      padding="$md"
      borderRadius="$sm"
      marginBottom="$md"
      alignItems="center"
    >
      <Text
        fontWeight="bold"
        color={variant === 'primary' ? '$white' : '$black'}
      >
        {text}
      </Text>
    </Button>
  )
}

export default CustomButton

