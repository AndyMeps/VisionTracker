import React from 'react';
import PositionDetails from './components/PositionDetails';
import { StyleSheet, Text, View, Button } from 'react-native';

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

  componentWillMount() {
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
      <View style={styles.container}>
        <PositionDetails {...this.state} />
        <Button title="Force Update" onPress={() => {
          this.updateLocation();
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
