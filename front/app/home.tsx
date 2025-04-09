import { YStack } from 'tamagui';
import { NavBar } from "@/components/organisms/navbar"
import { useNavigationStore } from '@/store/navigationStore';
import { HomeTab } from "@/screens/HomeTab";
import { MessagesTab } from '@/screens/MessagesTab';
import  JamsTab  from '@/screens/JamsTab';
import ProfileTab from '@/screens/ProfileTab';

export default function Index() {
  const { activeTab } = useNavigationStore();

  return (
    <YStack flex={1}>
      <YStack flex={1}>
        {activeTab === 0 && <HomeTab />}
        {activeTab === 1 && <MessagesTab />}
        {activeTab === 2 && <JamsTab />}
        {activeTab === 3 && <ProfileTab />}
      </YStack>
      <NavBar />
    </YStack>
  );
}
