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
import Typography from '@mui/material/Typography'
import fire from '../helpers/db';
import AppBar from '@mui/material/AppBar';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import LoanRequest from '../components/LoanRequest';
import PendingBorrower from '../components/PendingBorrower';
import RejectedBorrower from '../components/RejectedBorrower';
import Login from "./Login"
// import PropTypes from 'prop-types';



const Investment = () => {
    const { height, width } = UseWindowDimensions();
    const [validUser, setValidUser] = useState(false);
    const [verifiedBorrowers, setVerifiedBorrowers] = useState([])

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'inspection')

        var temp = []


        fire.database().ref('request').once('value').then((data) => {
            data.forEach(child => {
                if(child.val().statusCode === '-2')
                    temp.push({...child.val(), _key:child.key})
            });
            setVerifiedBorrowers(temp)
        });
        
    }

    useEffect(() => {
        userState();
    }, []);
    return (
        <div style={{ minHeight: height, width: width }}>
            <Titlebar title="Rejected Lender Requests" backlink="/dashboardinspection" />
            <div className="investmentContainer" style={{ width: width }}>

                <div className='investments'>
                    {/* <VerifiedBorrower */}
                    {verifiedBorrowers.length > 0 ?
                        verifiedBorrowers.map((item, key) => {
                            return (
                                    <RejectedBorrower key={key} props={item} />
                                )
                            

                        }) :
                        "No rejected lender found"
                    }

                </div>
            </div>





        </div>
    )
}



export default Investment