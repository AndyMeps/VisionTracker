import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
* Returns true of the screen is in landscape mode
*/
const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

export default (props) => (
  <View style={getStyle().container}>
    <Text style={getStyle().fieldLabel}>{props.label}</Text>
    <Text style={getStyle().fieldValue}>{props.value}</Text>
  </View>
);

const getStyle = () => {
  return StyleSheet.create({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    fieldLabel: {
      fontSize: isLandscape() ? 25 : 15,
      fontWeight: 'bold',
      width: '50%',
      textAlign: 'right',
      paddingRight: '5%',
    },
    fieldValue: {
      fontSize: isLandscape() ? 25 : 15,
      width: '50%',
    }
  });
}
