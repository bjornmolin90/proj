import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { Base, Typography, Form } from '../styles';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Circle } from 'react-native-maps';;
import * as Location from 'expo-location';

export default function showSurroundings({ route, navigation }) {

    const strokeWidth = 2
    const radiusList = route.params.delay.map((item, index) =>
                    <Circle
                    key={index}
                    center={{
                        latitude: route.params.lat,
                        longitude: route.params.long
                    }}
                    radius={ item }
                    strokeColor="#FF0000"
                    strokeWidth={ strokeWidth }
                    testID="circle"
                    />)

    const marker = <Marker
    coordinate={{ latitude: route.params.lat, longitude: route.params.long }}
    title={route.params.name}
    testID="markerSurroundings"
    />
    return (
        <View style={Base.base}>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: route.params.lat,
                    longitude: route.params.long,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                testID="mapSurroundings"
                >
                {marker}
                {radiusList}
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
