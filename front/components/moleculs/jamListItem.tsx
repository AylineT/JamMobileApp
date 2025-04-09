import { Text, YStack, Image, Button, XStack } from "tamagui"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useNavigationStore } from '@/store/navigationStore';
import { ChevronRight, Heart } from "@tamagui/lucide-icons";
import { useState } from "react";

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
  const { title, date, location, image } = jam;
  const { setActiveTab, setJam } = useNavigationStore();
  const fave = false;
  const [fav, setFav] = useState(fave)

  const onPressFav = () => {
    setFav((current) => !current)
    //envoi à la db
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
          <Text color="white" textAlign="left" fontSize={14}>{format(date, 'd MMMM yyyy, hh:mm',  { locale: fr })}</Text>
          <Text color="white" textAlign="left" fontSize={14}>{location}</Text>
        </YStack>
        <XStack justifyContent="space-between">
          <Button onPress={onPressFav} backgroundColor="transparent">
            <Heart size={24} fill={fav ? "white" : "transparent"}/>
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
