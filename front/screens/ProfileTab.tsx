import React, { useEffect, useState } from 'react'
import { YStack, Text } from "tamagui";
import { useRouter } from 'expo-router'
import userService from "@/services/userService";

import ProfilePictureUploader from '@/components/molecules/ProfilePictureUploader'
import CustomInput from '@/components/atoms/CustomInput'
import CustomButton from '@/components/atoms/CustomButton'

interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  instruments?: string;
}

export const ProfileTab = () => {
  const [user, setUser] = useState<User>({} as User)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const { id, username, bio = "", email } = user || {};

  const logout = async () => {
    try {
      await userService.logout();
      router.replace('/')
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      console.log("achieved")
    }
  };

  const update = async () => {
    try {
      setError('');
      await userService.update(id, { ...user });
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update profile');
    } finally {

    }
  }

  const onChange = (value: string, id: string) => {
    setUser(current => ({...current, [id]: value}))
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const userData = await userService.getMe()
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Could not load profile data');
      }
    }
    fetch()
  }, [])

  return (
    <YStack flex={1} background="black" padding="2%" justifyContent="center">
      <Text fontSize="$6" fontWeight="bold" color="$white" textAlign="center" marginBottom="2%">
        Votre profil
      </Text>

      {/* <ProfilePictureUploader /> */}

      {error.length > 0 && (
        <Text color="red" marginBottom="2%" textAlign="center">
          {error}
        </Text>
      )}

      <CustomInput 
        label="Pseudo" 
        placeholder="écrivez ici..." 
        value={username} 
        onChangeText={(value) => onChange(value, "username")} 
      />
      <CustomInput 
        label="Bio" 
        placeholder="écrivez ici..."
        type="textarea"
        value={bio} 
        onChangeText={(value) => onChange(value, "bio")} 
      />
      <CustomInput 
        label="Email" 
        value={email} 
        disabled={true}
      />

      <YStack space="2%" width="100%" justifyContent="space-between" marginTop="5%">
        <CustomButton text="Valider les changements" onPress={update} />
        <CustomButton text="Se déconnecter" variant="secondary" onPress={logout} />
      </YStack>
    </YStack>
  )
}
