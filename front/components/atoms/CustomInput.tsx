import { Input, Text, YStack, TextArea } from 'tamagui'

type Props = {
  placeholder?: string
  value: string
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
  label?: string
  disabled?: boolean
  type?: string
  onFocus?: () => void
}

export default function CustomInput({ placeholder, value = "", onChangeText, secureTextEntry = false, label, disabled, type, onFocus }: Props) {
  const Field = type === "textarea" ? TextArea : Input
  return (
    <YStack>
      {label && <Text>{label}</Text>}
      <Field
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        backgroundColor="$bginput"
        color="$white"
        width="100%"
        alignItems='center'
        borderRadius="$sm"
        padding="$md"
        marginBottom="$md"
        disabled={disabled}
      />
    </YStack>
  )
}
