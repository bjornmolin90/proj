import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function showMap({ delayList, stationList, allStations, navigation }) {
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function delayedTrains(stn) {
        let trainNumber = []
        let delayArray = []
        let radiusArray = []
        const delaysAtStation = delayList.filter(delay => {
            return delay.Code == stn
        });
        delaysAtStation.map((item, index) => {
            if (!trainNumber.includes(item.Nr)) {
                let delay = item.Delay/60
                delayArray.push(allStations[item.To] + ": " + delay + " min")
                if (delay > 2) {
                    radiusArray.push((delay - 2) * 50)
                }
                trainNumber.push(item.Nr)
            }
        });
        return [delayArray, radiusArray];
    }

            const markerList = stationList.map((station, index) => <Marker key={index}
            coordinate={{ latitude: station.Lat, longitude: station.Long }}
            title={station.Name}
            testID={station.Name}
            description='Tryck för att se förseningar'
            onCalloutPress={() => {
                let delays = delayedTrains(station.Code);
                Alert.alert(
                    "Förseningar från " + station.Name,
                    delays[0].join('\n'),
                    [
                        {
                            text: "Återgå",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Visa omgivning", onPress: () => {
                            navigation.navigate('Omgivning', {
                                delay: delays[1],
                                lat: station.Lat,
                                long: station.Long,
                                name: station.Name,
                            });
                        }
                    }
                    ]
                );
            }}
            />);

    return (
        <View style={Base.base}>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 61.0,
                    longitude: 15.35,
                    latitudeDelta: 18,
                    longitudeDelta: 10,
                }}
                testID="map"
                >
                {markerList}
                {locationMarker}
                </MapView>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        postion: "absolute"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 520,
        width: 370
    },
});
