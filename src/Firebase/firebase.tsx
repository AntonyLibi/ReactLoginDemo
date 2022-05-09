import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import {AuthProvider, createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { login,register,forgot } from "../redux/createSlice";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { Log } from "../Logger/logger";
import swal from "sweetalert";
import { sendPasswordResetEmail } from "firebase/auth"
import { NavigateToPages, Pages } from "../Components/Navigation/Navigation";

const firebaseConfig = {
  apiKey: "AIzaSyD8LfWB_0pXSuYLwVcAsMnkUdTufn3eKNM",
  authDomain: "fir-prg2.firebaseapp.com",
  projectId: "fir-prg2",
  storageBucket: "fir-prg2.appspot.com",
  messagingSenderId: "77729145019",
  appId: "1:77729145019:web:a1648bf9bcc91f932e499e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const SignInWithEmailAndPassword=(email:string,navigate:NavigateFunction,password:string,dispatch:Dispatch<AnyAction>)=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((result)=>{
       dispatch(login({type:"Email Login",name:result.user.displayName,email:result.user.email,loggedIn:true}))
       swal({
        title: "Success",
        text: "Logged In!",
        icon: "success",
      })
      NavigateToPages(Pages.home,navigate)
    })
    .catch(error=>{
      swal({
        title: "Error :(",
        text: "Error Logging In!",
        icon: "error",
      })
      const btn=document.getElementById('login_button');
          if(btn!==null){
                btn.classList.remove('button--loading')
          }
    })
}

export const CreateUserWithEmailAndPassword=(email:string,password:string,dispatch:Dispatch<AnyAction>)=>{
  createUserWithEmailAndPassword(auth,email,password)
  .then((result)=>{
     dispatch(register({type:"Email Register",name:result.user.displayName,email:result.user.email,loggedIn:false}))
     swal({
      title: "Success",
      text: "Registered",
      icon: "success",
    })
    const btn=document.getElementById('register_button');
          if(btn!==null){
                btn.classList.remove('button--loading')
          }
  })
  .catch(error=>{
    swal({
      title: "Error :(",
      text: "Error Registering!",
      icon: "error",
    })
    const btn=document.getElementById('register_button');
          if(btn!==null){
                btn.classList.remove('button--loading')
          }
  })
}

export const SignInWithSocial=(dispatch: Dispatch<AnyAction>,navigate:NavigateFunction,provider: AuthProvider,type:string,loggedIn:boolean)=>{  
  signInWithPopup(auth,provider)
  .then((result)=>{
    dispatch(loggedIn?login({type,name:result.user.displayName,email:result.user.email,loggedIn})
             :register({type,name:result.user.displayName,email:result.user.email,loggedIn}))
    swal({
      title: "Success",
      text: "Action Completed",
      icon: "success",
    })
    loggedIn?NavigateToPages(Pages.home,navigate):NavigateToPages(Pages.signUp,navigate)
  }).catch(error=>{
    dispatch(login({name:null,email:null,loggedIn:false}))
  })
}

export const ForgotPasswordReset=(email:any,dispatch:Dispatch<AnyAction>)=>{
   return sendPasswordResetEmail(auth,email)
   .then(()=>{
      dispatch(forgot({email,status:"sent"}))
      swal({
        title: "Success",
        text: "Reset link sent",
        icon: "success",
      })
      const btn=document.getElementById('forgot_button');
          if(btn!==null){
                btn.classList.remove('button--loading')
          }
   })
   .catch(error=>{
    dispatch(forgot({email:null,status:"failed"}))
    swal({
      title: "error",
      text: "Failed to send reset link!",
      icon: "error",
    })
    const btn=document.getElementById('forgot_button');
          if(btn!==null){
                btn.classList.remove('button--loading')
          }
   })
}



