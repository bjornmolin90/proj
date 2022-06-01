import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainData from './TrainData.tsx';
import SurroundingsView from './SurroundingsView.tsx';

const Stack = createNativeStackNavigator();

export default function Map(props) {
    return (
        <Stack.Navigator initialRouteName="Karta">
            <Stack.Screen name="Karta">
          {(screenProps) => <TrainData {...screenProps} delays={props.delays} setDelays={props.setDelays} stations={props.stations} setStations={props.setStations}/>}
            </Stack.Screen>
            <Stack.Screen name="Omgivning">
                {(screenProps) => <SurroundingsView {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
