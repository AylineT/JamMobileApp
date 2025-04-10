import { ScrollView, YStack } from "tamagui"
import { JamListItem } from "@/components/molecules/jamListItem"
import { useNavigationStore } from "@/store/navigationStore";
import CustomButton from "@/components/atoms/CustomButton";

interface JamListProps {
  jams: Jam[];
}

export const JamsList = ({ jams }: JamListProps) => {
  const { setActiveTab} = useNavigationStore();

  const onPress = () => {
    setActiveTab('createJam')
  }

  return (
    <>
      <ScrollView position="relative">
        <YStack gap={24}>
          {jams.map((jam, index) => (
            <JamListItem key={`event-${index}`} jam={jam} />
          ))}
        </YStack>
      </ScrollView>
      <YStack position="absolute" bottom={16} right={16} zIndex={10} >
        <CustomButton onPress={onPress} text="Créer une jam"/>
      </YStack>
    </>
  );
};
