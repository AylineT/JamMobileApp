import { SizableText, YStack } from 'tamagui';
import { NavBar } from "@/components/organisms/navbar"
import { useNavigationStore } from '@/store/navigationStore';
import { HomeTab } from "@/screens/HomeTab";
import { MessagesTab } from '@/screens/MessagesTab';
import { JamsTab } from '@/screens/JamsTab';
import { ProfileTab } from '@/screens/ProfileTab';
import { JamDetails } from '@/screens/JamDetails';

export default function Index() {
  const { activeTab } = useNavigationStore();
  console.log(activeTab)


  return (
    <YStack flex={1}>
      <SizableText>HEADER</SizableText>
      {activeTab === "home" && <HomeTab />}
      {activeTab === "messages" && <MessagesTab />}
      {activeTab === "jams" && <JamsTab />}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "jamDetails" && <JamDetails /> }
      <NavBar />
    </YStack>
  );
}
