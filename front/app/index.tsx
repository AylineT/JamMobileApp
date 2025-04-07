import { Text, View } from "react-native";
import { TamaguiProvider } from 'tamagui';
import { config } from "@/tamagui.config";

export default function Index() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </TamaguiProvider>
  );
}
