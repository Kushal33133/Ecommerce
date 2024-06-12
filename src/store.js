import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./features/products-slice"
import cartReducer from "./features/cart-slice"
import categoriesReducer from "./features/categories-slice"
import checkoutSlice from "./features/checkout-slice";

export const store = configureStore({
    reducer: {
        cart:cartReducer,
        products:productsReducer,
        categories:categoriesReducer,
        checkout:checkoutSlice

    }

})