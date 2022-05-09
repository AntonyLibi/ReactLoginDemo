import { createSlice } from "@reduxjs/toolkit";

//Login

interface loginInterface{
    type:string,
    name:string|null,
    email:string|null,
    loggedIn:boolean
}

const initialStateLogin:loginInterface={
     type:"",
     name:null,
     email:null,
     loggedIn:false
 }

 export const LoginSlice=createSlice({
     name: 'login',
     initialState:initialStateLogin,
     reducers:{
         login:(state,action)=>{
               state.type=action.payload.type
               state.name=action.payload.name
               state.email=action.payload.email
               state.loggedIn=action.payload.loggedIn
         }
     }
 })

 export const {login}=LoginSlice.actions

 export const loginReducer= LoginSlice.reducer

 //forgot

 interface forgotInterface{
    email:string|null,
    status:string
}

 const initialForgot:forgotInterface={
     email:null,
     status:""
 }

 export const forgotSlice=createSlice({
     name:'forgotPwd',
     initialState:initialForgot,
     reducers:{
        forgot:(state,action)=>{
               state.email=action.payload.email
               state.status=action.payload.status
        }
     }
 })
 export const {forgot}=forgotSlice.actions

 export const forgotReducer= forgotSlice.reducer

 //Register

interface registerInterface{
    type:string,
    name:string|null,
    email:string|null,
    loggedIn:boolean
}

const initialStateRegister:registerInterface={
    type:"",
    name:null,
    email:null,
    loggedIn:false
}

export const RegisterSlice=createSlice({
    name: 'register',
    initialState:initialStateRegister,
    reducers:{
        register:(state,action)=>{
            state.type=action.payload.type
            state.name=action.payload.name
            state.email=action.payload.email
            state.loggedIn=action.payload.loggedIn
        }
    }
})

export const {register}=RegisterSlice.actions

export const registerReducer= RegisterSlice.reducer

//Book

interface bookInterface{
    Author:string,
    bookName:string,
    published:string
}

const initialStateBook:bookInterface={
    Author:"",
    bookName:"",
    published:""
}

export const BookSlice=createSlice({
    name: 'Book',
    initialState:initialStateBook,
    reducers:{
        book:(state,action)=>{
              state.Author=action.payload.Author
              state.bookName=action.payload.bookName
              state.published=action.payload.published
        }
    }
})

export const {book}=BookSlice.actions

export const bookReducer= BookSlice.reducer