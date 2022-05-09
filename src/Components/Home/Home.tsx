import { AnyAction } from "@reduxjs/toolkit";
import { AnyArray } from "immer/dist/internal"
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { login } from "../../redux/createSlice";
import '../../Css/Main.css'
import { NavigateToPages,Pages } from "../Navigation/Navigation";
import UserDataService from '../../Firebase/user/userdetails'
import { store } from "../../redux/store";
import {Container, Box, Toolbar,Typography,List,ListItem,Drawer,AppBar,IconButton } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import DehazeIcon from '@material-ui/icons/Dehaze'
import BookIcon from '@material-ui/icons/Book'
import LogoutIcon from '@mui/icons-material/Logout';
import FlagIcon from '@material-ui/icons/Flag'
import { blueGrey } from "@mui/material/colors";
import { blue } from "@material-ui/core/colors";
import MaterialTable from "material-table";
import {db} from '../../Firebase/firestore'
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { DisplayBook } from "./DisplayBook";
import { DisplayCountries } from "./DisplayCountries";
import Avvvatars from 'avvvatars-react'

const useStyles= makeStyles((theme)=>({
    menuButton:{
        marginRight:theme.spacing(2),
    },
    title:{
        marginRight:"auto"
    },
    drawer:{
        width:300,
        marginTop:10,
    },
    iconAlign:{
        marginLeft:160
    },
    ListItem:{
        marginTop:10
    },
    content:{
        padding:theme.spacing(9)
    }
})) 

const handleBackToLogin=(e:React.MouseEvent<HTMLButtonElement>,dispatch: Dispatch<AnyAction>,navigate:NavigateFunction)=>{
     e.preventDefault();
     dispatch(login({type:"",name:null,email:null,loggedIn:false}))
     NavigateToPages(Pages.signIn,navigate)
}

export const Home=()=>{
    const store1=store.getState();
    const classes=useStyles()
    const [opens, setOpens]=useState(false);
    const [isHome, setIsHome]=useState("mainhome");

    const byUser=store1.login.email;
    const byName=store1.login.name;
    const dispatch=useDispatch()
    const navigate=useNavigate()

    return(
        <Container>
        <Drawer open={opens} onClose={()=>setOpens(false)}>
            {/* <Box display="flex" p={4} mt={5} justify-content="space-between" fontWeight={500}>
                <Typography>
                    <Box mt={2} fontWeight="fontWeightBold">
                        Hello
                    </Box> 
                    <Box fontWeight="fontWeightBold" ml={4} fontSize={14}>
                        Hello
                    </Box>
                </Typography>
            </Box> */}

            <List className={classes.drawer}>
                <ListItem button className={classes.ListItem} onClick={(e)=>{setIsHome("mainhome") 
                                                                            setOpens(false)}}>
                    <BookIcon/>
                    <Box pl={1} color="inherit" className="title">
                        Books
                    </Box>
                </ListItem>

                <ListItem button onClick={(e)=>{setIsHome("mainuser")
                                                setOpens(false)}} >
                    <FlagIcon/>
                    <Box pl={1} color="inherit">
                        Countries
                    </Box>
                </ListItem>
            </List>
        </Drawer>

        <AppBar style={{background: '#2E3B55'}}>
            <Toolbar style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div style={{display:"flex",flexDirection:"row"}}>
            <IconButton edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={()=>setOpens(true)}>
                <DehazeIcon/>
                </IconButton>
                <Typography color="inherit" style={{marginTop:11}}>
                      Home
                </Typography>
            </div>
                <Typography style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                <Avvvatars value={byUser===null?byName+"":byUser+""} /> 
                 <label style={{color:'red', marginRight:"10px", marginLeft:"10px"}}>{byUser===null?byName:byUser}</label>
                 <IconButton edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={(e)=>handleBackToLogin(e,dispatch,navigate)}>
                <LogoutIcon/>
                </IconButton>
                </Typography>
            </Toolbar>
        </AppBar>
        
        <div id='main_home' style={{marginTop:100}}>
          {isHome==="mainhome"?<DisplayBook/>:<DisplayCountries/>}
        </div>
    </Container>
        //  <div className="home_container">
        //  <div className="home_heading">
        //     <label className="labelWelcome">Welcome Home  </label><label className="labelName">{byUser===null?byName:byUser}</label>
            
        //     <button className="back_to_login_button"
        //     onClick={(e)=>handleBackToLogin(e,dispatch,navigate)}>Back to login</button>
        //     <UserList/>
        //     </div>
        //  </div>
        // </div> 
    )
}