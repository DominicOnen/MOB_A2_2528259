import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import SkillsScreen from '../screens/SkillsScreen';
import { colors } from '../theme';
import { ProjectsStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<ProjectsStackParamList>();

const headerOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '700' as const },
};

// Stack route nested inside the Projects tab: list, then Project Details.
function ProjectsStack() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="ProjectList" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project details' }} />
    </Stack.Navigator>
  );
}

const icons: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'],
  Skills: ['construct', 'construct-outline'],
  Projects: ['folder-open', 'folder-open-outline'],
  Profile: ['person-circle', 'person-circle-outline'],
  About: ['information-circle', 'information-circle-outline'],
};

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarAllowFontScaling: false, // keeps five tabs on one line for large system text
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={icons[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'DOPortfolio' , tabBarLabel: 'Home' }} />
      <Tab.Screen name="Skills" component={SkillsScreen} options={{ title: 'Skills and education' , tabBarLabel: 'Skills' }} />
      <Tab.Screen name="Projects" component={ProjectsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Edit profile' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Tab.Navigator>
  );
}
