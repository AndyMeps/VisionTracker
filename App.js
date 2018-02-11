import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Button } from 'react-native';

import PositionDetails from './components/PositionDetails';


const positionOptions = { enableHighAccuracy: true, maximumAge: 1000 };

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
    };
  }

  componentDidMount() {
    this.startLocationWatch();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch();
  }

  handleLocationCallback({ coords }) {
    const { latitude, longitude, speed, accuracy } = coords;
    this.setState({
      latitude,
      longitude,
      speed: speed > 0 ? speed * 2.23694 : 0,
      accuracy,
      lastCapture: new Date().toISOString(),
    });
  }

  startLocationWatch() {
    navigator.geolocation.watchPosition(
      this.handleLocationCallback.bind(this),
      null,
      positionOptions,
    );
  }

  updateLocation() {
    navigator.geolocation.getCurrentPosition(
      this.handleLocationCallback.bind(this),
      null,
      positionOptions,
    );
  }

  render() {
    return (
      <View style={detailStyles.container}>
        {
          this.state.latitude !== 0 && <MapView
            minZoomLevel={15}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            region={{ ...this.state, ...{ latitudeDelta: 0.0922, longitudeDelta: 0.0421 } }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        }

        <PositionDetails {...this.state} />
        <Button title="Force Update" onPress={() => {
          this.updateLocation();
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
