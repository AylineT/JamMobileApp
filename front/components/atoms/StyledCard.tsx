import { Card, Image, Text, Button } from 'tamagui'
import { ReactNode } from 'react'

interface StyledCardProps {
  title: string
  onPress?: () => void
  children?: ReactNode
}

export const StyledCard = ({ title, onPress, children }: StyledCardProps) => {
  return (
    <Card
      elevation={2}
      width={220}
      padding={"$3" as any}
      backgroundColor="white"
      borderRadius={8}
      gap={"$2" as any}
    >
      <Image
        source={{ uri: 'https://source.unsplash.com/400x200/?music' }}
        height={100}
        borderRadius={"$3" as any}
      />

      <Text fontSize="$5" fontWeight="700" color="black">
        {title}
      </Text>

      {children} {/* <- ce qu'on insère depuis HomeTab */}

      {onPress && (
        <Button size={"$2" as any} theme={"active" as any} onPress={onPress}>
          Voir le détail
        </Button>
      )}
    </Card>
  )
}

