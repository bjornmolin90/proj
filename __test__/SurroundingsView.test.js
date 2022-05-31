import { render, fireEvent } from '@testing-library/react-native';
import SurroundingsView from '../components/SurroundingsView';

const navigation = () => false;
const route = {
    "params": {
        delay: [400],
        lat: 16.17060693896951,
        long: 60.1472930337373,
        name: "Alingsås",
        endStation: "Gävle: 6 min"
    }
}


test('Testig TrainData', async () => {
    const { getByText, getByTestId, getByA11yLabel } = render(<SurroundingsView
                route={route}
                navigation={navigation}
            />);

    const circle = await getByTestId("circle")
    expect(circle).toBeDefined();
    const lat = circle.props.center.latitude
    expect(16.17060693896951).toEqual(lat)

    const marker = await getByTestId("markerSurroundings")
    expect(marker).toBeDefined();
    const title = marker.props.title
    expect("Alingsås").toEqual(title)

    const map = await getByTestId("mapSurroundings")
    expect(map).toBeDefined();
    const long = map.props.initialRegion.longitude
    expect(60.1472930337373).toEqual(long)

});
