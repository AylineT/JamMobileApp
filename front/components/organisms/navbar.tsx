import React from 'react';
import { Tabs, YStack, SizableText } from 'tamagui';
import { Home, MessagesSquare, Music, User } from '@tamagui/lucide-icons';
import { useNavigationStore } from '../../store/navigationStore'

const tabs = [
  {
    value: "home", 
    Icon: Home,
    title: "Home"
  },
  {
    value: "messages", 
    Icon: MessagesSquare,
    title: "Messages"
  },
  {
    value: "Jams", 
    Icon: Music,
    title: "Jams"
  },
  {
    value: "profile", 
    Icon: User,
    title: "Profil"
  }
]

export const NavBar: React.FC = () => {
  const { activeTab, setActiveTab } = useNavigationStore();

  return (
    <YStack>
      <Tabs
        defaultValue="home"
        orientation="horizontal"
        flexDirection="column"
        height={60}
      >
        <Tabs.List
          disablePassBorderRadius
          justifyContent="space-around"
          backgroundColor="$black"
        >
          {tabs.map(({value, Icon, title}, index) => {
            return (
              <Tabs.Tab
                value={value}
                onPress={() => setActiveTab(index)}
                flexDirection="column"
                paddingVertical={10}
                backgroundColor="$black"
              >
                <Icon size={24} color={activeTab === index ? "$primary" : "$white"} />
                <SizableText fontSize={12} color={activeTab === index ? "$primary" : "$white"}>{title}</SizableText>
              </Tabs.Tab>
            )
          })}
        </Tabs.List>
      </Tabs>
    </YStack>
  );
};
