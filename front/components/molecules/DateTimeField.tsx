import { Pressable } from 'react-native'
import { Text, YStack, Label } from 'tamagui'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'
import { useState } from 'react'

type Props = {
  label: string
  mode: 'date' | 'time'
  value: Date
  onChange: (date: Date) => void
}

export default function DateTimeField({ label, mode, value, onChange }: Props) {
  const [show, setShow] = useState(false)

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShow(false)
    if (selectedDate) onChange(selectedDate)
  }

  const formatted =
    mode === 'date'
      ? value.toLocaleDateString()
      : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <YStack>
      {label.length > 0 && (
        <Label color="$white" marginBottom="$lm">{label}</Label>
      )}

      <Pressable onPress={() => setShow(true)}>
        <YStack
          borderRadius="$sm"
          padding="$md"
          backgroundColor="$black"
          marginBottom="$sm"
          borderWidth={1}
          borderColor="#444"
        >
          <Text color="$white">{formatted}</Text>
        </YStack>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleChange}
          is24Hour
        />
      )}
    </YStack>
  )
}
