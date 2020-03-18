import React from 'react';
import {View, FlatList, Text} from "react-native";
import {useSelector} from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

function OrdersScreen (){
  const orders = useSelector(state => state.orders.orderItem);

  console.log("Order : "+orders);
  return (<FlatList data={orders}
                   keyExtractor={item =>item.id}
                   renderItem={
                     itemData => <OrderItem
                       amount={itemData.item.totalAmount}
                       date={itemData.item.readableDate}
                       items={itemData.item.items}
                     />
                   }/>);

}

export default OrdersScreen;
