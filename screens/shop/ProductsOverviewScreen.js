import React from 'react';
import {Button, FlatList, Text, View, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from '../../store/actions/cart';
import Color from "../../constants/Color";

function ProductOverviewScreen({route, navigation}){
  const  products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const selectItemHandler = (id,title) => {
    navigation.navigate('Product Detail', {
      productId : id,
      productTitle : title,
    })
  } ;
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductItem
          imageURL={itemData.item.imageUrl}
          title={itemData.item.title} price={itemData.item.price}
          onSelect={()=>{
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
            <Button
              color={Color.primaryColor}
              title="View Details"
              onPress={()=>{
                selectItemHandler(itemData.item.id, itemData.item.title)
              }}/>
            <Button color={Color.primaryColor} title="Add to Cart" onPress={()=>{dispatch(cartAction.addToCart(itemData.item))}}/>
        </ProductItem>
      }
    />
  )
}

export default ProductOverviewScreen;
