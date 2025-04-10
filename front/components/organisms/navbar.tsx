import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather' // ou autre lib d’icônes installée
import { useNavigationStore } from '../../store/navigationStore'

const tabs = [
  {
    key: 'home',
    icon: 'home',
    title: 'Home'
  },
  {
    key: 'messages',
    icon: 'message-square',
    title: 'Messages'
  },
  {
    key: 'jams',
    icon: 'music',
    title: 'Jams'
  },
  {
    key: 'profile',
    icon: 'user',
    title: 'Profil'
  }
]

export const NavBar: React.FC = () => {
  const { activeTab, setActiveTab } = useNavigationStore()

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => setActiveTab(index)}
        >
          <Icon
            name={tab.icon}
            size={24}
            color={activeTab === index ? '#007AFF' : '#ffffff'}
          />
          <Text style={[styles.label, activeTab === index && styles.activeText]}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tab: {
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    color: '#ffffff'
  },
  activeText: {
    color: '#007AFF'
  }
})
