import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Button, AlertIOS } from 'react-native';

import PositionDetails from './components/PositionDetails';


const positionOptions = { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 1000 };

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      speed: 0,
      heading: -1,
      accuracy: 0,
      lastCapture: '',
      cachedLatLong: [],
    };
  }

  handlePositionError(error) {
    AlertIOS.alert(
      'Position Error',
      error.message,
      [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel',
        },
      ]
    );
  }

  componentDidMount() {
    this.startLocationWatch();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchPositionId);
  }

  handleLocationCallback({ coords }) {
    const { latitude, longitude, speed, accuracy } = coords;
    const lastCapture = new Date().toISOString();
    this.setState({
      latitude,
      longitude,
      speed: speed > 0 ? speed * 2.23694 : 0,
      accuracy,
      lastCapture: lastCapture,
      cachedLatLong: [...this.state.cachedLatLong, { latitude, longitude, speed, accuracy, lastCapture }],
    });
  }

  startLocationWatch() {
    const watchPositionId = navigator.geolocation.watchPosition(
      this.handleLocationCallback.bind(this),
      this.handlePositionError.bind(this),
      positionOptions,
    );

    this.setState({
      watchPositionId,
    });
  }

  updateLocation() {
    navigator.geolocation.getCurrentPosition(
      this.handleLocationCallback.bind(this),
      this.handlePositionError.bind(this),
      positionOptions,
    );
  }

  logCache() {
    AlertIOS.alert(
      'Location History',
      JSON.stringify(this.state.cachedLatLong),
      [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel',
        },
      ]
    );

    this.setState({
      cachedLatLong: [],
    });
  }

  render() {
    return (
      <View style={detailStyles.container}>
        {
          this.state.latitude !== 0 && <MapView
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        }
        <PositionDetails {...this.state} />
        <Button title="Force Update" onPress={() => {
          this.updateLocation();
        }} />
        <Button title="JsonResult" onPress={() => {
          this.logCache();
        }} />
      </View>

    );
  }
}


const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
