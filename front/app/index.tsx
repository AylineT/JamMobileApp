import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavBar } from '../components/organisms/navbar'
import { useNavigationStore } from '../store/navigationStore'
import { HomeTab } from '../screens/HomeTab'
import { MessagesTab } from '../screens/MessagesTab'
import { JamsTab } from '../screens/JamsTab'
import { ProfileTab } from '../screens/ProfileTab'

export default function Index() {
  const { activeTab } = useNavigationStore()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 0 && <HomeTab />}
        {activeTab === 1 && <MessagesTab />}
        {activeTab === 2 && <JamsTab />}
        {activeTab === 3 && <ProfileTab />}
      </View>
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
})
