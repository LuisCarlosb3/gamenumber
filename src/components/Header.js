import React from 'react';
import {Text, View, StyleSheet, Platform, StatusBar} from 'react-native';
import Colors from '../constants/colors';
const Header = props => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <StatusBar backgroundColor={Colors.primary} />
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerIOS: {
    backgroundColor: 'white',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
});
export default Header;
