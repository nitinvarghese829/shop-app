import React from 'react';
import {Alert, Button, FlatList} from 'react-native';
import ProductItem from "../../components/shop/ProductItem";
import {useSelector, useDispatch} from "react-redux";
import Color from "../../constants/Color";
import * as productAction from "../../store/actions/products";
import * as cartAction from "../../store/actions/cart";

function UserProductsScreen({navigation}){

  const deleteHandler = (id) => {
    Alert.alert("Are you sure", "Do you really want to delete",[
      {text:"No", style:'default'},
      {
        text:"Yes", style:'destructive', onPress:() => {
          dispatch(productAction.deleteProduct(id));
        }
      }
    ])
  };
  const dispatch = useDispatch();
  const userProducts = useSelector(state =>state.products.userProducts)
  return <FlatList data={userProducts}
                   keyExtractor={item =>item.id}
                   renderItem={itemData =>
                     <ProductItem
                       imageURL={itemData.item.imageUrl}
                       title={itemData.item.title}
                       price={itemData.item.price}
                       onSelect={()=>{
                         navigation.navigate("Edit Products", {pid: itemData.item.id});
                       }}
                     >
                       <Button
                         color={Color.primaryColor}
                         title="Edit"
                         onPress={()=>{
                           navigation.navigate("Edit Products", {pid: itemData.item.id});
                         }}/>
                       <Button
                         color={Color.primaryColor}
                         title="Delete"
                         onPress={deleteHandler.bind(this, itemData.item.id)}/>
                     </ProductItem>
                   }
  />
}

export default UserProductsScreen;
