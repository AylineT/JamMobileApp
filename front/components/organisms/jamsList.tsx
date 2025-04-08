import { ScrollView, YStack } from "tamagui"
import { JamListItem } from "@/components/moleculs/jamListItem"

interface JamListProps {
  jams: Jam[];
}

export const JamsList = ({ jams }: JamListProps) => {
  return (
    <ScrollView>
      <YStack gap={24}>
        {jams.map((jam, index) => (
          <JamListItem key={`event-${index}`} jam={jam} />
        ))}
      </YStack>
    </ScrollView>
  );
};
