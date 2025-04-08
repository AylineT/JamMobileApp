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
      style={{
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#222",
        marginBottom: 15,
        color: "#fff",
      }}
    />
  )
}
