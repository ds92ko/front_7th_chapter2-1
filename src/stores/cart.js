import { createStore } from '@/core/store';

const initState = {
  items: [],
};

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const cartStore = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex !== -1) {
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };
    default:
      return state;
  }
});

export const addItem = (payload) => ({ type: ADD_ITEM, payload });
export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });
export const clearCart = () => ({ type: CLEAR_CART });
export const increaseQuantity = (payload) => ({ type: INCREASE_QUANTITY, payload });
export const decreaseQuantity = (payload) => ({ type: DECREASE_QUANTITY, payload });
