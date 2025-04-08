import { Button } from 'tamagui'

type Props = {
  text: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
}

const CustomButton = ({ text, onPress, variant = 'primary' }: Props) => {
  return (
    <Button
      onPress={onPress}
      style={{
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
        backgroundColor: variant === 'primary' ? "#007bff" : "#eee",
      }}
    >
      <span
        style={{
          color: variant === 'primary' ? "#fff" : "#111",
          fontWeight: "bold",
        }}
      >
        {text}
      </span>
    </Button>
  )
}

export default CustomButton
