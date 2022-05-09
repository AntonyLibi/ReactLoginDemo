import { AnyAction } from "@reduxjs/toolkit";
import { AnyArray } from "immer/dist/internal"
import { Dispatch, MouseEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { book, login } from "../../redux/createSlice";
import '../../Css/Main.css'
import { NavigateToPages,Pages } from "../Navigation/Navigation";
import UserDataService from '../../Firebase/user/userdetails'
import { store } from "../../redux/store";
import {Container, Box, Toolbar,Typography,List,ListItem,Drawer,AppBar,IconButton } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import DehazeIcon from '@material-ui/icons/Dehaze'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import { blueGrey } from "@mui/material/colors";
import { blue } from "@material-ui/core/colors";
import MaterialTable from "material-table";
import {db} from '../../Firebase/firestore'
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { BookDetails } from "./BookDetails";
import { SpinnerCircular, SpinnerCircularFixed } from 'spinners-react';



export const DisplayBook=()=>{

    const navigate=useNavigate()
    const dispatch=useDispatch()

    console.log("First Line")
    const [users, setUsers] = useState<AnyArray>([])
    const [loaders,setLoaders]=useState(false);
    
    useEffect(()=>{
        getUsers();
    },[])

    const getUsers=async()=>{
        setLoaders(true);
        const data=await UserDataService.getAllUsers();
        console.log(data.docs)
        setUsers(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        setLoaders(false)
        }

    const columns=[
        {
            title:"Author",
            field:"Author"
        },
        {
            title:"BookName",
            field:"bookName"
        },
        {
            title:"Published On",
            field:"published"
        }
    ]
    console.log(users)
    return(
        <div>
           {loaders===false?<MaterialTable 
               columns={columns}
               data={users} onRowClick={(evt,rowData)=>{handleRowClick(rowData,navigate,dispatch)}}
               title="Books Table"
               options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                rowStyle: {
                    backgroundColor: '#EEE',
                  },
                }}
           />:
           <div className="loader">
           <SpinnerCircularFixed size={52} thickness={158} speed={134} color="rgba(57, 172, 80, 1)" secondaryColor="rgba(57, 172, 80, 0)" />
           </div>}
        </div>
    )
 }

 const handleRowClick=(rowData:any,navigate:NavigateFunction,dispatch:Dispatch<AnyAction>)=>{
    dispatch(book({Author:rowData.Author,bookName:rowData.bookName,published:rowData.published}))
    //   NavigateToPages(Pages.bookDetails,navigate)
    NavigateToPages(Pages.bookDetails,navigate)
 }

