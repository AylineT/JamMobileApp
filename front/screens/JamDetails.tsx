import { useNavigationStore } from "@/store/navigationStore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Image, Text, YStack, XStack, Button } from "tamagui";
import { CircleCheck } from "@tamagui/lucide-icons";
import { useState } from "react";
import jamService from "@/services/jamService";

export const JamDetails = () => {
  const { jam } = useNavigationStore();
  
  if (!jam) {
    return <Text>Jam introuvable</Text>;
  }
  
  const { id, title, event_date, location, description, created_by, is_participating,
    image = "https://media.istockphoto.com/id/1806011581/fr/photo/des-jeunes-gens-heureux-et-ravis-de-danser-de-sauter-et-de-chanter-pendant-le-concert-de-leur.jpg?s=612x612&w=0&k=20&c=d1GQ5j33_Ie7DBUM0gTxQcaPhkEIQxkBlWO0TLNPB8M=" 
  } = jam;

  console.log(jam)

  const [participate, setParticipate] = useState(is_participating)

  const onPress = async () => {
    try {
      participate === false ? await jamService.participate(id) : await jamService.leave(id, created_by)
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setParticipate((value) => !value)
      console.log("good")
    }
  }

  return (
    <YStack
      flex={1}
      backgroundColor="$black"
      padding={16}
      gap={16}
    >
      <YStack 
        position="relative" 
        width="100%" 
        height={200} 
        overflow="hidden" 
        borderRadius={20}
      >
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
          position="relative" 
          width="100%" 
          height={200} 
          overflow="hidden" 
          borderRadius={20}
          padding={24}
          justifyContent="end"
          alignItems="end"
          backgroundColor="rgba(0,0,0,0.5)"
        >
          <Button onPress={onPress} backgroundColor="transparent" fontSize={24}>
            Je participe !
            <CircleCheck size={28} color={participate ? "$black" : "$white"} fill={participate ? "white" : "transparent"}/>
          </Button>
        </YStack>
      </YStack>
      <YStack gap={8}>
        <Text fontSize={24} fontWeight="bold" color="$white">
          {title}
        </Text>
        <XStack display="flex" flexDirection="column" gap={8} alignItems="start" flexWrap="wrap">
          <Text color="gray">
            {format(event_date, "d MMMM yyyy • HH:mm", { locale: fr })}
          </Text>
          <Text color="gray">{location}</Text>
        </XStack>
      </YStack>

      <Text color="gray" fontSize={16} lineHeight={24}>
        {description}
      </Text>

      <Text fontSize={14} color="gray">
        Organisé par <Text fontWeight="600">{created_by}</Text>
      </Text>
    </YStack>
  );
};
