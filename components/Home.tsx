import { Base, Typography } from '../styles';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import station from '../assets/station.jpg';

export default function Home() {
  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <Image source={station} style={Typography.imageMain} />
        <Text style={Typography.headerMain}>Tågförseningar</Text>
        <Text style={Typography.text}>
        I appen kan du se alla stationer med aktuella förseningar. Genom att trycka på stationens markör kan du se hur långa förseningarna är och vilken slutstation tågen har.
        </Text>
        <Text style={Typography.text}>
        Genom att trycka på omgivningar syns även hur långt du hinner gå utan att missa det försenade tåget med två minuters marginal.
        </Text>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
