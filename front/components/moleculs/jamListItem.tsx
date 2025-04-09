import { Text, YStack, Image, Button } from "tamagui"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useNavigationStore } from '@/store/navigationStore';

interface Jam {
  id: number;
  title: string;
  image: string;
  date: Date;
  location: string;
  description: string;
  creator: string;
}

interface JamListItemProps {
  jam: Jam;
}

export const JamListItem = ({ jam }: JamListItemProps) => {
  const { title, date, location } = jam;
  const { setActiveTab, setJam } = useNavigationStore();
  const image = "https://media.istockphoto.com/id/1806011581/fr/photo/des-jeunes-gens-heureux-et-ravis-de-danser-de-sauter-et-de-chanter-pendant-le-concert-de-leur.jpg?s=612x612&w=0&k=20&c=d1GQ5j33_Ie7DBUM0gTxQcaPhkEIQxkBlWO0TLNPB8M="

  const onPress = () => {
    setActiveTab("jamDetails");
    setJam(jam);
    console.log("press");
  }

  return (
    <Button position="relative" width="100%" height={200} overflow="hidden" borderRadius={24} onPress={onPress}>
      <Image
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        source={{
          uri: image,
          width: 1200,
          height: 800,
        }}
      />
      <YStack
        position="absolute"
        bottom={0}
        width="100%"
        height="100%"
        padding={16}
        backgroundColor="rgba(0,0,0,0.5)"
      >
        <Text color="white" textAlign="left" fontWeight="bold" fontSize={18} paddingBottom={8}>{title}</Text>
        <Text color="white" textAlign="left" fontSize={14}>{format(date, 'd MMMM yyyy, hh:mm',  { locale: fr })}</Text>
        <Text color="white" textAlign="left" fontSize={14}>{location}</Text>
      </YStack>
    </Button>
  );
};
