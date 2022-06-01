import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from "./components/Map.tsx";
import Home from "./components/Home.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base, Typography } from './styles';
import { useState, useEffect } from 'react';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Hem": "home",
  "Förseningar": "train-sharp",
};

export default function App() {
  const [delays, setDelays] = useState([]);
  const [stations, setStations] = useState([]);
  
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Hem">
          {() => <Home/>}
          </Tab.Screen>
          <Tab.Screen name="Förseningar">
          {() => <Map delays={delays} setDelays={setDelays} stations={stations} setStations={setStations} />}
          </Tab.Screen>
      </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
