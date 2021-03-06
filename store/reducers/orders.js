import {ADD_ORDER} from "../actions/orders"
import Order from "../../models/order";

const initialState = {
  orderItem:[]
};

export default (state =initialState, action) =>{
  switch(action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orderItem: state.orderItem.concat(newOrder)
      }
  }

  return state;
}
