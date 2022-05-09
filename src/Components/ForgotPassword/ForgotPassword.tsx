import logo from "../../Assets/logo.png"
import '../../Css/Main.css'
import { useNavigate } from 'react-router-dom'
import letter from '../../../src/Assets/Letter.png'
import { useState } from "react"
import { ForgotPasswordReset } from "../../Firebase/firebase"
import { useDispatch } from "react-redux"
import { forgot } from "../../redux/createSlice"
import { NavigateToPages,Pages } from "../Navigation/Navigation"
import ellipseTopLeft from '../../Assets/TopLeftEllipse.png'
import ellipseBottomRight from '../../Assets/BottomRightEllipse.png'
import illustration2 from '../../Assets/illustration2.png'
import indicator from '../../Assets/indicator.png'

export const ForgotPassword=()=>{

    const [forgotEmail, setForgotEmail] = useState("")
    const [labelValue, setLabelValue] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBackToLoginClick=()=>{
          const email=null
          const status="idle"
          dispatch(forgot({email,status}))
          NavigateToPages(Pages.signIn,navigate)
    }

    const ForgotPassword=()=>{
      const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
      if (!validEmail.test(forgotEmail)){
        setLabelValue("Invalid email format!!")
        return
      }
      else{
            setLabelValue("")
      }
    }

    const ForgotPasswordHandle=()=>{
      const btn=document.getElementById('forgot_button');
      if(btn!==null){
            btn.classList.add('button--loading')
      }

      ForgotPasswordReset(forgotEmail,dispatch)
      setForgotEmail("")
      setLabelValue("")
    }

    return(
        <div className="main_forgot">
        <div className="left_forgot">
           <div className='forgot_logo_container'>
           <img className='forgot_logo1' 
           src={logo} alt="..."/>
           </div>
                <img className="letter_image" 
                src={letter} alt="..."/>
           <div className='form_container'>
                <div>
                      <label className='mail_label'>Mail Id</label>
                </div>
                <div>
                      <input className='mail_text' 
                      value={forgotEmail} 
                      onChange={(e)=>{setForgotEmail(e.target.value)
                                 ForgotPassword()}} type="email"/>
                </div>
                <div>
                      <label className="login_label" 
                      id="label_login">{labelValue}</label>
                </div>
                <div>
                      <button className='reset_link_button' id='forgot_button'
                      onClick={(e)=>ForgotPasswordHandle()}><span className='button__text'>Send reset link</span></button>
                </div>
                <div className='back_to_login_container'>
                    <a className='back_to_login' 
                    onClick={()=>handleBackToLoginClick()}>Back to Log in</a>
                </div>
           </div>
        </div>
        <div className="right_forgot">
                 <img className="image_top_left" 
                 src={ellipseTopLeft} alt="..."/>
            <div className="main_container">
                 <img className="illustration_image" 
                 src={illustration2}  alt="..."/>
                 <p className="heading">Forgot password</p>
                 <p className="description">Forgot your password? No worries. Provide
                 <br/> your login email address and we will send you a
                 <br/> password reset link to your email address.</p>
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