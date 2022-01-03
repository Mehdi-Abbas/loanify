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
import Searchbar from '../components/searchbar';
// import PropTypes from 'prop-types';



const Investment = () => {
    const { height, width } = UseWindowDimensions();
    return (
        <div style={{ minHeight: height, width: width }}>
            <Titlebar title="Search Investors" backlink="/dashboardborrower" />
            <div style={{marginTop:'20px',width:'100%',display:'flex', justifyContent:'center'}}>
                <Searchbar/>
            </div>
            <div className="investmentContainer" style={{ width: width }}>

                <div className='investments'>
                    {/* <InvestmentUnit name="Ahmed Ali" /> */}
                    <PendingBorrower name="Ahmed Ali"  rating="4.5" cancelable="true" req='true'/>
                    <PendingBorrower name="Sara Saad"  rating="4.5" cancelable="true"  req='true'/>
                    <PendingBorrower name="Bilal Khan"  rating="4.5" cancelable="true"  req='true'/>
                    <PendingBorrower name="Ahsan Raza"  rating="4.5" cancelable="true"  req='true'/>
                    <PendingBorrower name="Fawad Hassan"  rating="4.5" cancelable="true" req='true' />
                    <PendingBorrower name="Aliza Sheikh"  rating="4.5" cancelable="true"  req='true'/>

                </div>
            </div>
            




         </div>
    )
}



export default Investment