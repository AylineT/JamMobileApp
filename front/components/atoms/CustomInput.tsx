import { Input } from 'tamagui'

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry = false }: Props) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      backgroundColor="$bginput"
      color="$white"
      width="100%"
      alignItems='center'
      borderRadius="$sm"
      padding="$md"
      marginBottom="$md"
    />
  )
}
