import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Alert, FlatList, Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomText from '../components/CustomText';
import MainButton from '../components/MainButton';

import Icon from 'react-native-vector-icons/Ionicons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListItem = (listLength, itemData) => (
  <View key={itemData} style={styles.listItem}>
    <CustomText>#{listLength - itemData.index}</CustomText>
    <CustomText>{itemData.item}</CustomText>
  </View>
);
const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [deviceWidth,setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight,setDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userChoice, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(()=>{
    const updateLayout= ()=>{
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change',updateLayout);
    return ()=>{
      Dimensions.removeEventListener('change',updateLayout);
    }
  })

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry', style: 'cancel'},
      ]);
      return;
    } else if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );

    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <CustomText>Oponents Guess</CustomText>
        <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Icon name="md-remove" size={24} color="white" />
          </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Icon name="md-add" size={24} color="white" />
          </MainButton>
          </View>

        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CustomText>Oponents Guess</CustomText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Icon name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Icon name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '90%',
  },
  controls:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'80%',
    alignItems:'center'

  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 300 ? '60%' : '80%',
  },
  
  listItem: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'black',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default GameScreen;
