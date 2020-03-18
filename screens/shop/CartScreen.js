import React from 'react';
import {View,Text,FlatList,StyleSheet,Button} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import Color from "../../constants/Color";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders';
import Card from "../../components/UI/Card";

function CartScreen(){
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItem = useSelector(state => {
    const transformedCartItem = [];
    for(const key in state.cart.items){
      transformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItem.sort((a,b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();
  return(
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100/100)}</Text></Text>
        <Button color={Color.accentColor} title="Order Now"
                disabled={cartItem.length === 0}
                onPress={() => {
                  dispatch(ordersActions.addOrder(cartItem, cartTotalAmount))}
                }
        />
      </Card>
      <FlatList data={cartItem} keyExtractor={item => item.productId}
                renderItem={
                  itemData => <CartItem quantity={itemData.item.quantity}
                                         title={itemData.item.productTitle}
                                        amount={itemData.item.sum}
                                        onRemove={() => {
                                          dispatch(cartActions.removeFromCart(itemData.item.productId));
                                        }}
                                        deleteable
                  />
                }
      />
    </View>
  );
}

const styles= StyleSheet.create({
  screen:{
    margin:20,
  },
  summary: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
    padding:10,
  },
  summaryText:{
fontFamily:'open-sans-bold',
    fontSize:18,
    color: Color.accentColor
  }
});

export default CartScreen;
