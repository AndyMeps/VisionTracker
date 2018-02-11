import React from 'react';
import { View } from 'react-native';

import FieldRow from './FieldRow';

export default ({ latitude, longitude, accuracy, speed, lastCapture, heading }) => (
  <View>
    <FieldRow label="Latitude: " value={latitude} />
    <FieldRow label="Longitude: " value={longitude} />
    <FieldRow label="Speed: " value={`${speed.toFixed(2)} Mph`} />
    <FieldRow label="Accuracy: " value={`~ ${accuracy} metres`} />
    <FieldRow label="Heading" value={heading} />
    <FieldRow label="Last Capture: " value={lastCapture} />
  </View>
);