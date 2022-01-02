import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function Titlebar(props){
  return(
    <div className="titlebar">
      {props.backlink ? <Link to={props.backlink}><ArrowBackIosIcon style={{color:'white', marginLeft:'10px'}}/></Link>: null}
      <span>{props.title}</span>
    </div>
  )
}
