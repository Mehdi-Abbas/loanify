import React from 'react'
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
// import PropTypes from 'prop-types';



const Investment = () => {
    const { height, width } = UseWindowDimensions();
    return (
        <div style={{ minHeight: height, width: width }}>
            <Titlebar title="Approved Lender Requests" backlink="/dashboardinspection" />
            <div className="investmentContainer" style={{  width: width }}>

                <div className='investments'>
                    {/* <VerifiedBorrower */}
                    <VerifiedBorrower name="Ahmed Ali" amount="14000" rating="4.5" />
                    <VerifiedBorrower name="Mohammad Saad" amount="14000" rating="4.5" />
                    <VerifiedBorrower name="Bilal Khan" amount="14000" rating="4.5" />
                    <VerifiedBorrower name="Ahsan Raza" amount="14000" rating="4.5" />
                    <VerifiedBorrower name="Fawad Hassan" amount="14000" rating="4.5" />
                    <VerifiedBorrower name="Aliza Sheikh" amount="14000" rating="4.5" />

                </div>
            </div>





        </div>
    )
}



export default Investment