import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import CustomText from '../components/CustomText';
import Colors from '../constants/colors';

import MainButton from '../components/MainButton';
const GameOverScreen = props => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width * 0.7,
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get('window').height * 0.7,
  );
  useEffect(() => {
    const updateValues = () => {
      setDeviceHeight(Dimensions.get('window').height * 0.7);
      setDeviceWidth(Dimensions.get('window').width * 0.7);
    };
    Dimensions.addEventListener('change', updateValues);
    return () => {
      Dimensions.removeEventListener('change', updateValues);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <CustomText style={styles.title}>The Game is Over!</CustomText>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/success.png')}
            resizeMode="cover"
            style={{
              ...styles.image,
              width: deviceWidth * 0.7,
              height: deviceWidth * 0.7,
              borderRadius: (deviceWidth * 0.7) / 2,
              marginVertical: deviceHeight / 30,
            }}
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
    </ScrollView>
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
    marginVertical: Dimensions.get('window').height / 60,
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
  imageContainer: {
    borderColor: 'black',
    overflow: 'hidden',
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
