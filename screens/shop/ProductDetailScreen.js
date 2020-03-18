import React from 'react';
import { Button, Image, ScrollView, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import Color from "../../constants/Color";
import * as cartAction from "../../store/actions/cart"



function ProductDetailScreen({route, navigation}){
  const productId = route.params.productId;
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
      <View style={styles.action}>
        <Button color={Color.primaryColor} onPress={() => {
          dispatch(cartAction.addToCart(selectedProduct));
        }} title="Add to Cart" />
      </View>
      <Text style={styles.price}>
        Price: ${selectedProduct.price.toFixed(2)}
      </Text>
      <Text style={styles.description}>
        Desc : {selectedProduct.description}
      </Text>
    </ScrollView>
  );


}
const styles= StyleSheet.create({
  text:{
    fontSize: 22
  },
  image: {
    width: '100%',
    height: 300,
  },
  price:{
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    marginVertical: 20
  },
  description:{
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  },

});

export default ProductDetailScreen;
