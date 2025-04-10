import CustomButton from "@/components/atoms/CustomButton";
import { useNavigationStore } from "@/store/navigationStore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Image, Text, YStack, XStack, Button } from "tamagui";
import { CircleCheck } from "@tamagui/lucide-icons";
import { useState } from "react";

export const JamDetails = () => {
  const { jam } = useNavigationStore();
  const fave = false
  const [fav, setFav] = useState(fave)

  if (!jam) {
    return <Text>Jam introuvable</Text>;
  }

  const { title, date, location, description, creator, image } = jam;

  const onPress = () => {
    setFav((value) => !value)
    console.log("mettre en fav")
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
            <CircleCheck size={28} color={fav ? "$black" : "$white"} fill={fav ? "white" : "transparent"}/>
          </Button>
        </YStack>
      </YStack>
      <YStack gap={8}>
        <Text fontSize={24} fontWeight="bold" color="$white">
          {title}
        </Text>
        <XStack display="flex" flexDirection="column" gap={8} alignItems="start" flexWrap="wrap">
          <Text color="gray">
            {format(date, "d MMMM yyyy • HH:mm", { locale: fr })}
          </Text>
          <Text color="gray">{location}</Text>
        </XStack>
      </YStack>

      <Text color="gray" fontSize={16} lineHeight={24}>
        {description}
      </Text>

      <Text fontSize={14} color="gray">
        Organisé par <Text fontWeight="600">{creator}</Text>
      </Text>
    </YStack>
  );
};
