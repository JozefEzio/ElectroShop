import { configureStore } from "@reduxjs/toolkit";
import ventesReducer from './ventesSlice';
export const store=configureStore({
    reducer:{
        ventes:ventesReducer,
    }
})