import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import CustomText from '../components/CustomText';
import MainButton from '../components/MainButton';
const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth,setButtonWidth] = useState(Dimensions.get('window').width/4);

  
  
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  useEffect(()=>{
    const updateLayout = ()=>{
      setButtonWidth(Dimensions.get('window').width/4);
    }
    Dimensions.addEventListener('change',updateLayout);
    return () =>{
      Dimensions.removeEventListener('change',updateLayout);
    }
  });

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
    Keyboard.dismiss();
  };
  const confirmInputHandler = () => {
    const choseNumber = parseInt(enteredValue);
    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert(
        'Invalid number',
        'Number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    setSelectedNumber(choseNumber);
    setEnteredValue('');
    setConfirmed(true);
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <CustomText> Chosen Number: </CustomText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new Game</Text>
        <Card style={styles.inputContainer}>
          <CustomText>Select a Number</CustomText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCaptilize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={{width: buttonWidth}}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={{width: buttonWidth}}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'OpenSans-Bold',
  },
  inputContainer: {
    width:'80%',
    maxWidth:'90%',
    minWidth: 300,  
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
  },
});

export default StartGameScreen;
