import { ScrollView, YStack, Button } from "tamagui"
import { JamListItem } from "@/components/moleculs/jamListItem"
import { useNavigationStore } from "@/store/navigationStore";

interface JamListProps {
  jams: Jam[];
}

export const JamsList = ({ jams }: JamListProps) => {
  const { setActiveTab} = useNavigationStore();

  const onPress = () => {
    setActiveTab('createJame')
  }

  return (
    <ScrollView>
      <YStack gap={24}>
        {jams.map((jam, index) => (
          <JamListItem key={`event-${index}`} jam={jam} />
        ))}
      </YStack>
      <Button onPress={onPress}>create</Button>
    </ScrollView>
  );
};
