import { JamsList } from "@/components/organisms/jamsList";
import { useEventsStore } from "@/store/eventsStore";
import { YStack, Tabs, SizableText } from "tamagui";
import { useEffect, useState } from "react";
import jamService from "@/services/jamService";
<<<<<<< HEAD
import {Jam} from "../components/atoms/Jam"
=======
import { Jam } from "@/store/navigationStore";

>>>>>>> d65d85dda27ad032de2580f2fcb21a6ae3ff61e6
const tabs = [
  {
    value: "mine",
    title: "J'y participe"
  },
  {
    value: "all",
    title: "Toutes les jams"
  }
]

export const JamsTab = () => {
  const { activeTab, setActiveTab } = useEventsStore();
  const [jams, setJams] = useState<Jam[]>([])
  const [list, setList] = useState(jams.filter(({is_participating}) => !!is_participating === true));
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const setTab = (value: string) => {
    setActiveTab(value)
    value === tabs[0].value 
      ? setList(jams.filter(({is_participating}) => !!is_participating === true)) 
      : setList(jams)
  } 

  useEffect(() => {
    const getJams = async () => {
      try {
        setLoading(true);
        setError('');
        const events = await jamService.getAllJams();
        setJams(events)
      } catch (err) {
        console.error('Login failed:', err);
        setError('Invalid email or password');
      } finally {
        setLoading(false);
      }
    };

    getJams()
  }, [activeTab])

  return (
    <YStack flex={1} backgroundColor="$black" padding={16} gap={16}>
      <Tabs
        defaultValue={tabs[0].value}
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
