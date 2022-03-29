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
// import PropTypes from 'prop-types';



const Investment = () => {
    const { height, width } = UseWindowDimensions();
    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'borrower')
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
                                <PendingBorrower name="Ahmed Ali" rating="4.5" cancelable="true" />
                                <PendingBorrower name="Mohammad Saad" rating="4.5" cancelable="true" />
                                <PendingBorrower name="Bilal Khan" rating="4.5" cancelable="true" />
                                <PendingBorrower name="Ahsan Raza" rating="4.5" cancelable="true" />
                                <PendingBorrower name="Fawad Hassan" rating="4.5" cancelable="true" />
                                <PendingBorrower name="Aliza Sheikh" rating="4.5" cancelable="true" />

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