import React, { useState, useEffect } from "react";
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/Investment'
import Titlebar from '../components/Titlebar';
import { Tab, Tabs } from '@mui/material';
// import { TabPanel } from '@mui/lab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import LoanRequest from '../components/LoanRequest';
import PendingBorrower from '../components/PendingBorrower';
import VerifiedBorrower from '../components/VerifiedBorrower';
import Login from "./Login"
import fire from '../helpers/db';
import InvesterTracking from "../components/InvesterTracking";
// import PropTypes from 'prop-types';



const Investment = () => {
    const { height, width } = UseWindowDimensions();
    const [validUser, setValidUser] = useState(false);
    const [APIData, setAPIData] = useState([])

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'borrower')

        fire.database().ref('request').once('value').then((data) => {
            var temp=[]
            data.forEach(child => {
                if(child.val().sender === localStorage.getItem('user_id') && child.val().statusCode === '0' || child.val().statusCode === '1')
                    temp.push({...child.val(), _key:child.key})
            });
            setAPIData(temp)

        }).catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {
        userState();
    }, []);
    return (
        <>
            {validUser ? (
                <>
                    <div style={{ minHeight: height, width: width }}>
                        <Titlebar title="Request Tracking" backlink="/dashboardborrower" />
                        <div className="investmentContainer" style={{ width: width }}>

                            <div className='investments'>
                                { APIData.length > 0 ?
                                    APIData.map((item, key) => {
                                        return (
                                            <InvesterTracking key={key} props={item}/>
                                        )
                                    }):
                                    "No request found"
                                }
                            </div>
                        </div>





                    </div>
                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )}
        </>

    )
}



export default Investment