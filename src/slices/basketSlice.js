import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  checkoutitems: [],
}; 

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions  
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
      console.log('items:', state.items);
      
      let alreadyInCart = false;
      const cartItems = state.checkoutitems;
      cartItems.forEach((item) => {
        if(item.id === action.payload.id){
          item.count++;
          alreadyInCart = true;
        }
      });
      if(!alreadyInCart){ // push items to cart
         state.checkoutitems = [...state.checkoutitems, action.payload]
        //  console.log('checkoutItems:', state.checkoutitems);
      }
    }, 

    deleteFromBasket: (state, action) => {
      let newCart = [...state.items];
      state.checkoutitems.map((item) => {
          if(item.id === action.payload.id){
              if(item.count > 1){
                const delindex = state.items.findIndex((cartItem) => cartItem.id === action.payload.id);
                  if(delindex >= 0){
                  newCart.splice(delindex,1)
                  item.count--;
                  }
                  else{
                    console.warn(
                      `Cant remove product (id: ${action.payload.id}) as it's not in cart )`
                    );
                  }
              }
              else
                item.count = 1;
          }
      })
      state.items = newCart;
    },

    removeFromBasket: (state, action) => {
      const index = state.checkoutitems.findIndex((cartItem) => cartItem.id === action.payload.id);
     
      let newCart = [...state.checkoutitems];
      if(index >= 0){
        // The item exists in the basket... remove it..
        newCart.splice(index, 1)
        var filtered = state.items.filter((item) => item.id !== action.payload.id)
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as it's not in cart )`
        );
      }
      state.checkoutitems = newCart;
      state.items = filtered;
  },
 },
}); 

export const { addToBasket, removeFromBasket, deleteFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectCheckoutItems = (state) => state.basket.checkoutitems;
export const selectTotal = (state) => state.basket.items.reduce((total,item) => total + item.price ,0);
export default basketSlice.reducer;

