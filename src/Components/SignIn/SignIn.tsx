import '../../Css/Main.css'
import google from "../../Assets/Google1.png"
import facebook from "../../Assets/Facebook.png"
import apple from "../../Assets/Apple.png"
import twitter from "../../Assets/Twitter.png"
import logo from "../../Assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SignInWithEmailAndPassword, SignInWithSocial } from '../../Firebase/firebase'
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { NavigateToPages, Pages } from '../Navigation/Navigation'
import ellipseTopLeft from '../../Assets/TopLeftEllipse.png'
import ellipseBottomRight from '../../Assets/BottomRightEllipse.png'
import illustration from '../../Assets/illustration.png'
import indicator from '../../Assets/indicator.png'

export const SignIn=()=>{

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] =useState("");
    const [labelValue,setLabelValue]=useState("");

    const navigate=useNavigate()

    const dispatch=useDispatch()

    const handleForgotClick=(e:React.MouseEvent<HTMLParagraphElement>)=>{
          e.preventDefault();
          NavigateToPages(Pages.forgot,navigate)
    }

    const handleNoAccountClick=(e:React.MouseEvent<HTMLParagraphElement>)=>{
          e.preventDefault();
          NavigateToPages(Pages.signUp,navigate)
    }

    const handleLogin=()=>{
          const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
          if (!validEmail.test(loginEmail)){
            setLabelValue("Invalid email format!!")
            return
          }
          else{
                setLabelValue("")
          }
          const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
          if (!validPassword.test(loginPassword)){
            setLabelValue("Invalid password format!!")
            return
          }
          else{
                setLabelValue("")
          }
    }

    const handleLoginClick=()=>{
      const email=loginEmail
      const password=loginPassword
        const btn=document.getElementById('login_button');
        if(btn!==null && loginEmail!=="" && loginPassword!==""){
              btn.classList.add('button--loading')
        }
      SignInWithEmailAndPassword(email,navigate,password,dispatch)
      }

    const handleGoogleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
          e.preventDefault();
          const provider=new GoogleAuthProvider();
          const type="Google Login"
          SignInWithSocial(dispatch,navigate,provider,type,true);
    }

    const handleFacebookClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
          e.preventDefault();
          const provider=new FacebookAuthProvider();
          const type="Facebook Login"
          SignInWithSocial(dispatch,navigate,provider,type,true);
    }

    const handleTwitterClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      const provider=new TwitterAuthProvider();
      const type="Twitter Login"
      SignInWithSocial(dispatch,navigate,provider,type,true);
}

    return(
        <div className="main_signin">
        <div className="left_signin">
           <div className='sign_in_logo_container'>
           <img className='sign_in_logo1' src={logo} alt="..."/>
           </div>
           <div className='form_container'>
                <div >
                      <label className='email_label'>Email Address</label>
                </div>
                <div className='email_container'>
                      <input className='email_text'
                      type="email" 
                      required
                      value={loginEmail} 
                      onChange={(e)=>{ setLoginEmail(e.target.value)
                                      handleLogin()}}/>
                </div>
                <div>
                      <label className='password_label'>Password</label>
                </div>
                <div>
                      <input className='password_text' 
                      type="password"
                      value={loginPassword} 
                      onChange={(e)=>{setLoginPassword(e.target.value)
                                       handleLogin()}}/>
                </div>
                {/* {btnClick === true && labelValue !== "" && <div>
                      <label className="login_label" 
                      id="label_login">*Please enter email.</label>
                </div>}
                {loginPassword==="" && loginEmail !== "" && btnClick === true && labelValue === "" &&<div>
                      <label className="login_label" 
                      id="label_login">*Please enter password</label>
                </div>} */}
                <div>
                      <label className="login_label" 
                      id="label_login">{labelValue}</label>
                </div>
                <div>
                      <p className='forgotpwd_link' 
                      onClick={(e)=>handleForgotClick(e)}>Forgot My Password</p>
                </div>
                <div>
                      <button className='login_button' id='login_button'
                      onClick={(e)=>{handleLoginClick()}}><span className='button__text'>Log in</span></button>
                </div>
                <div className='separator_container'>
                    <hr className='hr_separator1'/>
                    <label className='label_separator'>Or</label>
                    <hr className='hr_separator2'/>
                </div>
                <div className='extra_login_container1'>
                    <button className="btn_google" id="google_button"
                    onClick={(e)=>handleGoogleClick(e)}>
                    <div className="frame1">
                          <img className="img_google" 
                          src={google} alt="..."/>
                          <label className="label_google">Google</label>
                    </div>
                    </button>
                    <button className="btn_facebook" 
                    onClick={(e)=>handleFacebookClick(e)}>
                    <div className="frame2">
                          <img className="img_facebook" 
                          src={facebook} alt="..."/>
                          <label className="label_facebook">Facebook</label>
                    </div>
                    </button>
                </div>
                <div className='extra_login_container2'>
                    <button className="btn_apple">
                    <div className="frame3">
                          <img className="img_apple" src={apple} alt="..."/>
                          <label className="label_apple">Apple</label>
                    </div>
                    </button>
                    <button className="btn_twitter"
                    onClick={(e)=>handleTwitterClick(e)}>
                    <div className="frame4">
                          <img className="img_twitter" src={twitter} alt="..."/>
                          <label className="label_twitter">Twitter</label>
                    </div>
                    </button>
                </div>
                    <p className='no_account_container' 
                    onClick={(e)=>handleNoAccountClick(e)}>Dont have an account?<u>Register</u></p>
           </div>
        </div>
        <div className="right_signin">
        <img className="image_top_left" src={ellipseTopLeft} alt="..."/>
            <div className="main_container">
                 <img className="illustration_image" src={illustration}  alt="..."/>
                 <p className="heading">Heading</p>
                 <p className="description">Lorem ipsum dolor sit amet, consectetur 
                 <br/>adipiscing elit, sed do eiusmod tempor
                 <br/> incididunt ut labore et dolore magna aliqua.</p>
                 <img className="indicator" src={indicator}></img>
            </div>
            <div className="container2">
                 <img className="image_bottom_right" 
                 src={ellipseBottomRight} alt="..."/>
            </div>
        </div>
        </div>
    )
}


