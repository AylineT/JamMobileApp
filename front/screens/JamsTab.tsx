import { JamsList } from "@/components/organisms/jamsList";
import { useEventsStore } from "@/store/eventsStore";
import { YStack, Tabs, SizableText } from "tamagui";
import { isBefore, isAfter, startOfDay } from 'date-fns';
import { useState } from "react";

const jams = [
  {
    id: 1,
    title: "Midnight Jazz Jam",
    location: "The Blue Note, 131 W 3rd St, New York, NY",
    creator: "Elyes",
    description: "An open-stage night for jazz lovers. Bring your sax, piano skills, or just vibes.",
    date: "2025-04-15T22:00:00Z",
  },
  {
    id: 2,
    title: "Funk Fridays",
    location: "Groove Basement, 87 Camden High St, London",
    creator: "Ayline",
    description: "A funky gathering with tight grooves and dirty basslines. Everyone's welcome to jump in!",
    date: "2025-04-18T20:00:00Z",
  },
  {
    id: 3,
    title: "Acoustic Chill Session",
    location: "Sunset Café, 42 Rue de la République, Lyon",
    creator: "Kaoutar",
    description: "Unplugged acoustic jam with a focus on mellow vibes and coffeehouse-style ambiance.",
    date: "2025-04-13T16:00:00Z",
  },
  {
    id: 4,
    title: "Late Night Electronic Improv",
    location: "Subsonic Studio, Berlin",
    creator: "Ines",
    description: "Bring your synths, drum machines, or just your curiosity. Improvised live electronica 'til dawn.",
    date: "2025-04-20T23:30:00Z",
  },
  {
    id: 5,
    title: "Open Mic Jam & Poetry",
    location: "The Freehouse, 215 King St W, Toronto",
    creator: "Robin",
    description: "Poetry, spoken word, and acoustic jams collide in this cozy, creative meetup.",
    date: "2025-04-12T19:00:00Z",
  },
  {
    id: 6,
    title: "Late Night Electronic Improv",
    location: "Subsonic Studio, Berlin",
    creator: "Ines",
    description: "Bring your synths, drum machines, or just your curiosity. Improvised live electronica 'til dawn.",
    date: "2025-04-01T23:30:00Z",
  },
  {
    id: 7,
    title: "Open Mic Jam & Poetry",
    location: "The Freehouse, 215 King St W, Toronto",
    creator: "Robin",
    description: "Poetry, spoken word, and acoustic jams collide in this cozy, creative meetup.",
    date: "2025-04-02T19:00:00Z",
  }
];

const tabs = [
  {
    value: "coming",
    title: "À venir"
  },
  {
    value: "past",
    title: "Passées"
  }
]

export const JamsTab = () => {
  const { activeTab, setActiveTab } = useEventsStore();
  const [list, setList] = useState(jams.filter(({date}) => isAfter(date, startOfDay(new Date()))));

  const setTab = (value: string) => {
    setActiveTab(value)
    const method = value === "coming" ? isAfter : isBefore;
    setList(jams.filter(({date}) => method(date, startOfDay(new Date()))))
  } 


  return (
    <YStack flex={1} backgroundColor="$black" padding={16} gap={16}>
      <Tabs
        defaultValue="coming"
        orientation="horizontal"
        flexDirection="column"
      >
        <Tabs.List
          justifyContent="space-around"
          gap={8}
          width="100%"
        >
        {tabs.map(({title, value}) => {
          return (
            <Tabs.Tab
              value={value}
              key={`events-${value}`}
              onPress={() => setTab(value)}
              flex={1}
              paddingHorizontal={16}
              paddingVertical={8}
              backgroundColor={activeTab === value ? "$white" : "gray"}
              borderRadius={8}
            >
              <SizableText 
                fontSize={12} 
                color="$black"
              >
                {title}
              </SizableText>
            </Tabs.Tab>
          )
        })}
        </Tabs.List>
      </Tabs>
      <JamsList jams={list} />
    </YStack>
  )
};
