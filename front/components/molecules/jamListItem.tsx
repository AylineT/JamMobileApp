import { Text, YStack, Image, Button, XStack } from "tamagui"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useNavigationStore } from '@/store/navigationStore';
import { ChevronRight, CircleCheck } from "@tamagui/lucide-icons";
import { useState } from "react";
import jamService from "@/services/jamService";

interface JamAddress {
  longitude: number;
  latitude: number;
  label: string;
}
export interface Jam {
  id: number;
  title: string;
  image?: string;
  is_participating: boolean;
  event_date: Date;
  location_id: number;
  description: string;
  created_by: number;
  location: JamAddress;
}

interface JamListItemProps {
  jam: Jam;
}

export const JamListItem = ({ jam }: JamListItemProps) => {
  const { id, title, event_date, is_participating, created_by, location,
    image = "https://media.istockphoto.com/id/1806011581/fr/photo/des-jeunes-gens-heureux-et-ravis-de-danser-de-sauter-et-de-chanter-pendant-le-concert-de-leur.jpg?s=612x612&w=0&k=20&c=d1GQ5j33_Ie7DBUM0gTxQcaPhkEIQxkBlWO0TLNPB8M=" 
  } = jam;
  const { setActiveTab, setJam } = useNavigationStore();
  const [participate, setParticipate] = useState(is_participating)

  const onPressParticipate = async () => {
    setParticipate((value) => !value)
  
    try {
      participate === false ? await jamService.participate(id) : await jamService.leave(id, created_by)
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setParticipate((value) => !value)
      console.log("good")
    }
  }

  const onPressDetails = () => {
    setActiveTab("jamDetails");
    setJam(jam);
  }

  return (
    <YStack position="relative" width="100%" height={200} overflow="hidden" borderRadius={20}>
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
        flex={1}
        justifyContent="space-between"
        bottom={0}
        width="100%"
        height="100%"
        padding={16}
        backgroundColor="rgba(0,0,0,0.5)"
      >
        <YStack>
          <Text color="white" textAlign="left" fontWeight="bold" fontSize={18} paddingBottom={8}>{title}</Text>
          <Text color="white" textAlign="left" fontSize={14}>{format(event_date, 'd MMMM yyyy, hh:mm',  { locale: fr })}</Text>
          <Text color="white" textAlign="left" fontSize={14}>{location.label}</Text>
        </YStack>
        <XStack justifyContent="space-between">
          <Button onPress={onPressParticipate} backgroundColor="transparent">
            <CircleCheck size={24} color={participate ? "$black" : "$white"} fill={participate ? "white" : "transparent"}/>
          </Button>
          <Button onPress={onPressDetails} backgroundColor="transparent">
            Plus d'infos
            <ChevronRight size={24} />
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};
