import '../../Css/Main.css'
import google from "../../Assets/Google1.png"
import facebook from "../../Assets/Facebook.png"
import apple from "../../Assets/Apple.png"
import twitter from "../../Assets/Twitter.png"
import logo from "../../Assets/logo.png"
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CreateUserWithEmailAndPassword, SignInWithSocial } from '../../Firebase/firebase'
import { useDispatch } from 'react-redux'
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { NavigateToPages , Pages } from '../Navigation/Navigation'
import ellipseTopLeft from '../../Assets/TopLeftEllipse.png'
import ellipseBottomRight from '../../Assets/BottomRightEllipse.png'
import illustration from '../../Assets/illustration.png'
import indicator from '../../Assets/indicator.png'

export const SignUp=()=>{

      const [registerEmail, setRegisterEmail] = useState("")
      const [registerPassword, setRegisterPassword] = useState("")
      const [labelValue,setLabelValue]=useState("");

    const navigate:NavigateFunction=useNavigate();
    const dispatch=useDispatch()

    const handleBackToLoginClick=(e:React.MouseEvent<HTMLParagraphElement>)=>{
      e.preventDefault();
      NavigateToPages(Pages.signIn,navigate)
}

    const handleRegister=()=>{
      const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
      if (!validEmail.test(registerEmail)){
        setLabelValue("Invalid email format!!")
        return
      }
      else{
            setLabelValue("")
      }

      const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
      if (!validPassword.test(registerPassword)){
        setLabelValue("Invalid password format!!")
        return
      }
      else{
            setLabelValue("")
      }
}

   const handleRegisterClick=()=>{
      const btn=document.getElementById('register_button');
      if(btn!==null){
            btn.classList.add('button--loading')
      }

      const email=registerEmail
      const password=registerPassword
      CreateUserWithEmailAndPassword(email,password,dispatch)
      setLabelValue("")
   }

    const handleGoogleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      const provider=new GoogleAuthProvider();
      const type="Google Register"
      SignInWithSocial(dispatch,navigate,provider,type,false);
}

    const handleFacebookClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      const provider=new FacebookAuthProvider();
      const type="Facebook Register"
      SignInWithSocial(dispatch,navigate,provider,type,false);
}

    const handleTwitterClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      const provider=new TwitterAuthProvider();
      const type="Twitter Register"
      SignInWithSocial(dispatch,navigate,provider,type,false);
}
    return(
        <div className="main_signin">
        <div className="left_signin">
           <div className='sign_in_logo_container'>
           <img className='sign_in_logo1' src={logo} alt="..."/>
           </div>
           <div className='form_container'>
                <div>
                      <label className='mail_label'>Email Address</label>
                </div>
                <div>
                      <input className='mail_text'
                       type="email"
                       value={registerEmail}
                       onChange={(e)=>{setRegisterEmail(e.target.value)
                                        handleRegister()}}/>
                </div>
                <div>
                      <label className='password_label'>Password</label>
                </div>
                <div>
                      <input className='password_text' 
                      type="password"
                      value={registerPassword}
                      onChange={(e)=>{setRegisterPassword(e.target.value)
                                       handleRegister()}}/>
                </div>
                <div>
                      <label className="login_label" 
                      id="label_login">{labelValue}</label>
                </div>
                <div>
                      <button className='register_button' id='register_button'
                      onClick={(e)=>handleRegisterClick()}><span className='button__text'>Register</span></button>
                </div>
                <div className='separator_container'>
                    <hr className='hr_separator1'/>
                    <label className='label_separator'>Or</label>
                    <hr className='hr_separator2'/>
                </div>
                <div className='extra_register_container1'>
                    <button className="btn_google"
                    onClick={(e)=>handleGoogleClick(e)}>
                    <div className="frame1">
                          <img className="img_google" src={google} alt="..."/>
                          <label className="label_google">Google</label>
                    </div>
                    </button>
                    <button className="btn_facebook"
                    onClick={(e)=>handleFacebookClick(e)}>
                    <div className="frame2">
                          <img className="img_facebook" src={facebook} alt="..."/>
                          <label className="label_facebook">Facebook</label>
                    </div>
                    </button>
                </div>
                <div className='extra_register_container2'>
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
                <div className='have_account_container'>
                    <p className='have_account' 
                    onClick={(e)=>handleBackToLoginClick(e)}>Have an account<u>Login</u></p>
                </div>
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


