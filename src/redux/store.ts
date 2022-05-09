import { configureStore } from "@reduxjs/toolkit";
import {loginReducer,forgotReducer, registerReducer, bookReducer} from "./createSlice"

export const store=configureStore({
    reducer:{
        login: loginReducer,
        forgot: forgotReducer,
        register: registerReducer,
        book:bookReducer
    },
    devTools:true
})