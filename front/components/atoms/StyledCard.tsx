import { Card, Text, YStack } from 'tamagui'
import { Jam } from '@/store/navigationStore'

interface JamProps {
  jam: Jam;
  onPress?: () => void 
}

export const StyledCard = ({ jam, onPress }: JamProps) => {
  const { title, id, created_by, location, 
    image = "https://media.istockphoto.com/id/1806011581/fr/photo/des-jeunes-gens-heureux-et-ravis-de-danser-de-sauter-et-de-chanter-pendant-le-concert-de-leur.jpg?s=612x612&w=0&k=20&c=d1GQ5j33_Ie7DBUM0gTxQcaPhkEIQxkBlWO0TLNPB8M=" 
  } = jam
  const { label } = location;
  

  return (
    <YStack
      elevation={2}
      width={220}
      padding={8}
      backgroundColor="$white"
      borderRadius={8}
      gap={8}
      height="100%"
      onPress={onPress}
    >
      <Text fontSize={14} fontWeight="700" color="$black">
        {title}
      </Text>
      <Text fontSize={14} marginTop={4} color="$black">
        Créé par {created_by}
      </Text>
      <Text fontSize={14} marginTop={4} color="$black">
        Où ça ? {label}
      </Text>

      {/* <CustomButton onPress={() => onPress} text="Voir le détail"/> */}
    </YStack>
  )
}
