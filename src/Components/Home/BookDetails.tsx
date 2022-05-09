import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { store } from '../../redux/store';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { book } from '../../redux/createSlice';
import { NavigateToPages,Pages } from '../Navigation/Navigation';
import { IconButton } from '@material-ui/core';
import ArrowBack from '@mui/icons-material/ArrowBack';

export const BookDetails=()=>{

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const store1=store.getState()
    const Author=store1.book.Author
    const bookName=store1.book.bookName
    const published=store1.book.published

    return (
    // <div style={{width:"100vw", height:"100vh",backgroundColor:"#A7A0A8",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
    <div style={{width:"100vw", height:"100vh",backgroundColor:"#A7A0A8",display:"flex", flexDirection:"row", justifyContent:"center"}}>
    <Box sx={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <Card sx={{ minWidth: "100%", minHeight: "20%", variant:"outlined",background:"#EEE", borderRadius:"5%"}}>
      <IconButton edge="start"
                 className="back_to_home_button"
                color="inherit"
                style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",margin:"3px"}}
                onClick={(e)=>handleBackToHome(e,navigate,dispatch)}>
                <ArrowBack/>
                </IconButton>
          <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 25, fontFamily: "Georgia, serif"}} color="text.secondary" gutterBottom>
            Book Details for User Reference
          </Typography>
          <Typography sx={{variant:"body2" ,fontFamily: "cursive"}}>
            <h2>Author :{Author}
            <br/>
            Book name: {bookName}
            <br/>
            Published Date: {published}
            </h2>
          </Typography>
        </CardContent>
        </React.Fragment>
      </Card>
    </Box>
    </div>
    // </div>
    );
  }

  const handleBackToHome=(e:React.MouseEvent<HTMLButtonElement>,navigate:NavigateFunction,dispatch:Dispatch<AnyAction>)=>{
    dispatch(book({Author:"",bookName:"",published:""}))
    NavigateToPages(Pages.home,navigate)
  }