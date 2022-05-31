import { render, fireEvent } from '@testing-library/react-native';
import ShowMap from '../components/ShowMap';

const stationList = [{
    "Name": "Alingsås",
    "Lat": 16.17060693896951,
    "Long": 60.1472930337373,
    "Code": "A"
},
{
    "Name": "Gävle",
    "Lat": 16.17060693896951,
    "Long": 60.1472930337373,
    "Code": "Gä"
}]

const delayList = [{
    "Code": "A",
    "Delay" : 6,
    "Nr": "8175",
    "To": "My"
}]

let allStations = [{
    "A": "Alingsås"
}]

const navigation = () => false;


test('Testing ShowData', async () => {
    const { getByText, getByTestId, getByA11yLabel } = render(<ShowMap
delayList={delayList}
stationList={stationList}
allStations={allStations}
navigation={navigation}
            />);
    const marker1 = await getByTestId("Alingsås")
    expect(marker1).toBeDefined();
    const title1 = marker1.props.title
    expect("Alingsås").toEqual(title1)

    const marker2 = await getByTestId("Gävle")
    expect(marker2).toBeDefined();
    const title2 = marker2.props.title
    expect("Gävle").toEqual(title2)

    const map = await getByTestId("map")
    expect(map).toBeDefined();
    const lat = map.props.initialRegion.latitude
    expect(61.0).toEqual(lat)

});
