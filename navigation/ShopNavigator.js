import React,{Component} from "react";
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Color from '../constants/Color';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton"
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreens";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default class ShopNavigator extends Component{
  createShopStack = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Color.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'open-sans-bold'
        },
      }}>
        <Stack.Screen name="All Products" component={ProductOverviewScreen}
                      options={
                        ({route, navigation}) => ({
                          headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                              <Item title='Favourite'
                                    iconName='md-cart'
                                    onPress={() => {
                                      navigation.navigate('Cart');
                                    }}
                              />
                            </HeaderButtons>
                          ),
                          headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                              <Item title='Menu'
                                    iconName='ios-menu'
                                    onPress={() => {
                                      navigation.toggleDrawer();
                                    }}
                              />

                            </HeaderButtons>
                          )
                        })

                      }
        />
        <Stack.Screen name="Product Detail" component={ProductDetailScreen}
                      options={
                        ({route,navigation}) => ({title: route.params.productTitle,
                          headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                              <Item title='Favourite'
                                    iconName='md-cart'
                                    onPress={() => {
                                      navigation.navigate('Cart');
                                    }}
                              />
                            </HeaderButtons>
                          )})
                      }
        />
        <Stack.Screen name="Cart" component={CartScreen}
        />
      </Stack.Navigator>
    );
  };

  createOrders =() => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Color.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'open-sans-bold'
        },
      }}>
        <Stack.Screen name="Orders" component={OrdersScreen}
                      options={
                        ({route, navigation}) => ({
                          headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                              <Item title='Menu'
                                    iconName='ios-menu'
                                    onPress={() => {
                                      navigation.toggleDrawer();
                                    }}
                              />

                            </HeaderButtons>
                          )
                        })

                      }
        />
      </Stack.Navigator>
    );
  };


  userProducts =() => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Color.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'open-sans-bold'
        },
      }}>
        <Stack.Screen name="User Products" component={UserProductsScreen}
                      options={
                        ({route, navigation}) => ({
                          headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                              <Item title='Menu'
                                    iconName='ios-menu'
                                    onPress={() => {
                                      navigation.toggleDrawer();
                                    }}
                              />

                            </HeaderButtons>
                          ),
                          headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                              <Item title='Menu'
                                    iconName='ios-create'
                                    onPress={() => {
                                      navigation.navigate('Edit Products',{});
                                    }}
                              />

                            </HeaderButtons>
                          )
                        })

                      }
        />
        <Stack.Screen name="Edit Products" component={EditProductScreen}
                      options={
                        ({route, navigation}) => ({
                          title: route.params.pid ? 'Edit Products' : 'Add Product',
                        })

                      }
        />
      </Stack.Navigator>
    );
  };
  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator drawerStyle={{
          backgroundColor: '#efeded',
        }}
                          drawerContentOptions={{
                            activeTintColor: Color.accentColor,
                          }}
        >
          <Drawer.Screen name="Products" component={this.createShopStack}
                         options={
                           () => ({
                             drawerIcon: ({ focused, color, size }) => {
                               return <Ionicons name='ios-cart' size={23} color={color} />;
                             }
                           })
                         }
          />
          <Drawer.Screen name="Orders" component={this.createOrders}
                         options={
                           () => ({
                             drawerIcon: ({ focused, color, size }) => {
                               return <Ionicons name='ios-list' size={23} color={color} />;
                             }
                           })
                         }
          />
          <Drawer.Screen name="Admin" component={this.userProducts}
                         options={
                           () => ({
                             drawerIcon: ({ focused, color, size }) => {
                               return <Ionicons name='ios-create' size={23} color={color} />;
                             }
                           })
                         }
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
