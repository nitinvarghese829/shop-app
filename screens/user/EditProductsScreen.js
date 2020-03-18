import React, { useLayoutEffect, useEffect, useCallback, useReducer } from 'react';
import {TextInput ,View, Text, StyleSheet, ScrollView, Button, Alert} from 'react-native';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import * as productActions from "../../store/actions/products";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton"

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_UPDATE){
    const updatedValues = {
      ...state.inputValues,
      [action.input] : action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input] : action.isValid,
    };
    let updatedFormIsValid = true;
    for(const key in updateValidities){
      updatedFormIsValid = updatedFormIsValid && updateValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updateValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
};

function EditProductScreen({route, navigation}){

  const prodId = route.params.pid;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl:'',
      description: editedProduct ? editedProduct.description:'',
      price:''
    },
    inputValidities:{
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price:editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  });



  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if(text.trim().length > 0){
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    });
  };
  const submitHandler = useCallback(() =>{
    if(!formState.formIsValid){
      Alert.alert("Wrong Input!", "Please check errors in the form",[{text:"Okay!"}]);
      return;
    }
    if(editedProduct){
      dispatch(productActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
    }
    else{
      dispatch(productActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
    }
    navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.navigate("Edit Products", {submit: submitHandler});
  }, [submitHandler]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title='Save'
                iconName='ios-checkmark'
                onPress={
                  route.params.submit
                }
          />
        </HeaderButtons>
      ),
    },[navigation]);
  });

  return (
    <ScrollView>
      <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this, 'imageUrl')}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(this, 'price')}
              keyboardType='decimal-pad'

            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, 'description')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

EditProductScreen.navigationOptions = ({route, navigation}) => {
  return{
    headerTitle: route.params.pid  ? 'Edit Product' : 'Add Product',
  };
};

const styles= StyleSheet.create({
  form:{
    margin: 20
  }
});

export default EditProductScreen;
