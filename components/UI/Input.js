import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return(
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={formState.inputValues.title}
        onChangeText={textChangeHandler.bind(this, 'title')}
        keyboardType='default'
        autoCapitalize='sentences'
        autoCorrect
        returnKeyType='next'
      />
      {!formState.inputValidities.title && <Text>Enter a valid title!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl:{
    width:'100%'
  },
  label:{
    fontFamily:'open-sans-bold',
    marginVertical:10
  },
  input:{
    paddingHorizontal:2,
    paddingVertical:5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2
  }
});

export default Input;
