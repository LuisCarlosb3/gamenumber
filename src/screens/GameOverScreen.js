import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import CustomText from '../components/CustomText';
import Colors from '../constants/colors';

import MainButton from '../components/MainButton';
const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <CustomText style={styles.title}>The Game is Over!</CustomText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <CustomText style={styles.message}>
        Your phone needed{' '}
        <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
        guess the number{' '}
        <Text style={styles.highlight}>{props.userNumber} </Text>
      </CustomText>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  message: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
  },
});
export default GameOverScreen;
