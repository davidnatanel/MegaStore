import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

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
}

interface Product {
    products: Item[];
}

export interface ProductsState {
    products: Item[];
    productsModific: Item[];
    itemId: Item | null;
    Search: string;
    filterSearch: string;

    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    page: string | null | undefined;
}

const initialState: ProductsState = {
    products: [],
    itemId: null,
    Search: '',
    filterSearch: '',
    productsModific: [],
    status: 'idle',
    error: null,
    page: '',
};

var user = {
    nue: "sda"
}




export const fetchProducts = createAsyncThunk<any, void, { rejectValue: string }>('products/fetchProducts', async () => {
    try {
        const response = await axios.get<Product>('https://dummyjson.com/products?limit=100');
        const products = response.data;
        return products;
    } catch (error: any) {
        console.error(error);
        return [];
    }
});
export const fetchProductsByQuery = createAsyncThunk<Product, string, { rejectValue: string }>(
    'products/fetchProductsByQuery',
    async (query: string, { rejectWithValue }) => {
        try {
            console.log(`https://dummyjson.com/products${query}`)
            const response = await axios.get<Product>(`https://dummyjson.com/products${query}`);
            const products = response.data;
            return products;
        } catch (error: any) {
            console.error(error);
            return rejectWithValue('Error fetching products.');
        }
    }
);





export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload[0].products;
        },
        setItem: (state, action) => {
            state.itemId = action.payload;
        }
        ,
        clearItem: (state, action) => {
            state.itemId = action.payload;
        },
        changePage: (state, action) => {
            console.log(action.payload)
            console.log(state.page)
            state.page = action.payload;
        },
        filterBrand: (state, action) => {


            var s = state.products.filter((e) => e.brand == action.payload)

            state.productsModific = s;
        },
        filterPriceAction: (state, action) => {

            let s = state.products.filter((e) => e.price >= action.payload.min && e.price <= action.payload.max)


            if (s.length !== 0) {
                state.productsModific = s;

            }

        },

        filterCategorieAction: (state, action) => {
            var s = state.products.filter((e) => e.category == action.payload)
            state.productsModific = s;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'succeeded';
                state.products = action.payload.products;
                state.productsModific = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductsByQuery.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByQuery.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'succeeded';
                if (action.payload.products.length == 0) {


                    Swal.fire({
                        title: 'Search Error',
                        text: 'No results found for the search query.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        // Action to be executed after the alert is closed
                        // You can add any other logic or redirect to another page here
                        if (result.isConfirmed) {
                            console.log('Alert closed');
                        }
                    });
                    state.productsModific = state.products;


                    return
                }


                state.productsModific = action.payload.products;
            })
            .addCase(fetchProductsByQuery.rejected, (state, action) => {
                state.status = 'failed'
            })






    },

});

// Action creators are generated for each case reducer function
export const { setItem, clearItem, changePage, filterBrand, filterPriceAction, filterCategorieAction } = ProductsSlice.actions;

export default ProductsSlice.reducer;
