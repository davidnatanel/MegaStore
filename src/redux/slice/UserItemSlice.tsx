import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';



interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    quantity: number | any;

}

interface Product {
    products: Item[];
}

export interface ProductsState {
    cart: Item[];
    favorite: Item[];

}

const initialState: ProductsState = {
    cart: [],
    favorite: [],

};




//   user.quantity= 0

//   console.log(user)

//   user.quantity+= 1
//   user.quantity+= 1

//   console.log(user)

export const UserItemSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCart: (state, action) => {

            let find = state.cart.find((e) => e.title == action.payload.title)
            console.log(Boolean(find));
            if (!find) {
                let addCartItem = {
                    ...action.payload,
                    quantity: 1
                }
                state.cart = [...state.cart, addCartItem];
            }

        },

        addFavorite: (state, action) => {

            let find = state.favorite.find((e) => e.title == action.payload.title)
            console.log(Boolean(find));
            if (!find) state.favorite = [...state.favorite, action.payload];

        },

        clearFavorite: (state) => {
            state.favorite = [];
        },
        clearCart: (state) => {

            state.cart = [];
        },
        addCount: (state, action) => {


            state.cart[action.payload].quantity += 1;

        },
        restCount: (state, action) => {

            state.cart[action.payload].quantity > 1 ? state.cart[action.payload].quantity -= 1 : null

        },
        removeFavorite: (state, action) => {


            let filterf = state.favorite.filter((e) => e.title !== action.payload.title)

            state.favorite = filterf;
        },
        removeCart: (state, action) => {
            let filterc = state.cart.filter((e) => e.title !== action.payload.title)

            state.cart = filterc;

        },




    },

});

// Action creators are generated for each case reducer function
export const { addCart, addFavorite, clearFavorite,
    clearCart, addCount, restCount, removeFavorite
    , removeCart } = UserItemSlice.actions;
export default UserItemSlice.reducer;
