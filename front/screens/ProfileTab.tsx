import userService from "@/services/userService";
import { Button, SizableText, YStack } from "tamagui";
import { useNavigation } from 'expo-router';

export const ProfileTab = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await userService.logout();
      navigation.navigate('index')
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      console.log("achieved")
    }
  };

  return (
    <YStack flex={1} padding={16} gap={12} backgroundColor="$black">
      <SizableText>ajouter le form profil</SizableText>
      <Button onPress={logout} color="$black">logout</Button>
    </YStack>
  )
};
