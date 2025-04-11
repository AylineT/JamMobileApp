// components/molecules/JamCalloutCard.tsx

import { Card, Image, Text, Button, XStack, YStack, Avatar } from 'tamagui'
import { ReactNode, useEffect, useState } from 'react'
import { format } from 'date-fns'
import userService from '@/services/userService'

type JamCalloutCardProps = {
  title: string
  creator: number
  label?: string
  date?: Date
  onPress?: () => void
  children?: ReactNode
}

export const JamCalloutCard = ({
  title,
  creator,
  label,
  date,
  onPress,
  children,
}: JamCalloutCardProps) => {
  const [created, setCreated] = useState("")

  useEffect(() => {
    const fetch = async () => {
      const { username } = await userService.getUser(creator)
      setCreated(username)
    }
    fetch()
  }, [])

  return (
    <Card
      elevate
      width={240}
      padding={4}
      backgroundColor="white"
      borderRadius={6}
    >
      <YStack gap={3}>
        <Image
          source={{ uri: 'https://source.unsplash.com/400x200/?music,live' }}
          height={100}
          borderRadius={4}
        />

        <YStack gap={2}>
          <Text fontSize="$6" fontWeight="700" color="black">
            {title}
          </Text>

          <XStack alignItems="center" gap={2}>
            <Avatar circular size={2}>
              <Avatar.Image
                source={{ uri: 'https://source.unsplash.com/100x100/?musician' }}
              />
              <Avatar.Fallback backgroundColor={"gray"} />
            </Avatar>
            <Text fontSize="$3" color={"gray"}>
              {created}
            </Text>
          </XStack>

          {label && (
            <Text fontSize="$2" color={"gray"}>
              Adresse : {label}
            </Text>
          )}

          {date && (
            <Text fontSize="$2" color={"gray"}>
              📅 {format(date, "d MMMM yyyy • HH:mm")}
            </Text>
          )}

          {children}

          {onPress && (
            <Button size={2} onPress={onPress}>
              Voir le détail
            </Button>
          )}
        </YStack>
      </YStack>
    </Card>
  )
}
