// import { styled, Card } from 'tamagui'

// export const StyledCard = styled(Card, {
//   borderRadius: '$4' as any,
//   padding: '$3' as any,
//   width: 200,
// })

// src/components/atoms/StyledCard.tsx

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
      elevation={2} // ← valeur fixe et sûre
      width={220}
      padding={"$3" as any}
      backgroundColor="white"
      borderRadius={"$4" as any}
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

