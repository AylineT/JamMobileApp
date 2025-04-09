import { useNavigationStore } from "@/store/navigationStore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Image, Text, YStack, XStack, Button } from "tamagui";

export const JamDetails = () => {
  const { jam } = useNavigationStore();

  if (!jam) {
    return <Text>Jam introuvable</Text>;
  }

  const { title, date, location, description, creator, image } = jam;

  const onPress = () => {
    console.log("mettre en fav")
  }

  return (
    <YStack
      flex={1}
      backgroundColor="$black"
      padding={16}
      gap={16}
    >
      {/* Banner image */}
      <Image
        source={{
          uri: image,
          width: 1200,
          height: 675,
        }}
        width="100%"
        height={200}
        borderRadius={12}
        resizeMode="cover"
      />

      {/* Title & Date */}
      <YStack gap={8}>
        <Text fontSize={24} fontWeight="bold" color="$white">
          {title}
        </Text>

        <XStack display="flex" flexDirection="column" alignSelf="left" gap={8} alignItems="center" flexWrap="wrap">
          <Text color="gray">
            {format(date, "d MMMM yyyy • HH:mm", { locale: fr })}
          </Text>
          <Text color="gray">{location}</Text>
        </XStack>
      </YStack>

      {/* Description */}
      <Text color="gray" fontSize={16} lineHeight={24}>
        {description}
      </Text>

      {/* Creator */}
      <Text fontSize={14} color="gray">
        Organisé par <Text fontWeight="600">{creator}</Text>
      </Text>

      {/* CTA Button */}
      <Button marginTop={24} onPress={onPress}>
        Participer à la jam
      </Button>
    </YStack>
  );
};
