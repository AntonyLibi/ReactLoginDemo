import { NavigateFunction } from "react-router-dom"

export const NavigateToPages=(props:any,navigate:NavigateFunction)=>{

     props==='/Home'?navigate('/Home'):
     props==='/SignUp'?navigate('/SignUp'):
     props==='/'?navigate('/'):
     props==='/Forgot'?navigate('/Forgot'):
     props==='/BookDetails'?navigate('/BookDetails'):
     props==='/displayBooks'?navigate('/DisplayBooks'):
     props==='/displayCountries'?navigate('/DisplayCountries'):
     navigate("/")
}

export const Pages={
    home:'/Home',
    signIn:'/',
    signUp:'/SignUp',
    forgot:'/Forgot',
    bookDetails:'/BookDetails',
    displayBooks:'/DisplayBooks',
    displayCountries:'/DisplayCountries'
}