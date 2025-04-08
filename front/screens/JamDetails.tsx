import { useNavigationStore } from "@/store/navigationStore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Text, YStack } from "tamagui";

export const JamDetails = () => {
  const { jam } = useNavigationStore();
  
  if (!jam) {
    return <Text>No jam selected</Text>;
  }
  
  const { title, date, location, description, creator } = jam;
  
  return (
    <YStack flex={1} padding={16} gap={12} backgroundColor="$black">
      <Text fontSize={24} fontWeight="bold">{title}</Text>
      <Text>{format(date, 'd MMMM yyyy, hh:mm', { locale: fr })}</Text>
      <Text>{location}</Text>
      <Text>{description}</Text>
      <Text>Created by: {creator}</Text>
    </YStack>
  );
}
