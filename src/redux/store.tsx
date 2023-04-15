import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './slice/ProductsSlice'
import UserItemSlice from './slice/UserItemSlice'

export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        useritemslice: UserItemSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch