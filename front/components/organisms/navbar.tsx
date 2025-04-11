import React from 'react';
import { Tabs, YStack, SizableText } from 'tamagui';
import { Map, MessagesSquare, Music, User } from '@tamagui/lucide-icons';
import { useNavigationStore } from '@/store/navigationStore';

const tabs = [
  {
    value: "home", 
    Icon: Map,
    title: "Home"
  },
  {
    value: "messages", 
    Icon: MessagesSquare,
    title: "Messages"
  },
  {
    value: "jams", 
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
          {tabs.map(({value, Icon, title}) => {
            return (
              <Tabs.Tab
                value={value}
                key={`nav-item-${value}`}
                onPress={() => setActiveTab(value)}
                flexDirection="column"
                paddingVertical={10}
                backgroundColor="$black"
              >
                <Icon size={24} color={activeTab === value ? "$primary" : "$white"} />
                <SizableText fontSize={12} color={activeTab === value ? "$primary" : "$white"}>{title}</SizableText>
              </Tabs.Tab>
            )
          })}
        </Tabs.List>
      </Tabs>
    </YStack>
  );
};
