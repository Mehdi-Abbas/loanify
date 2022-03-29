import React, { useState, useEffect } from 'react'
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
import Login from './Login'
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
// import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Investment = () => {
    const { height, width } = UseWindowDimensions();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'lender')
    }

    useEffect(() => {
        userState();
    }, []);
    return (
        <>
            {validUser ? (
                <>
                    <div style={{ minHeight: height, width: width }}>
                        <Titlebar title="Loans" backlink="/dashboardlender" />
                        <div className="setting-icon">
                            <Link to={"/dashboardlender/investment/lendersetting"}><img src="setting.png"></img></Link>
                        </div>
                        
                        <Box sx={{ bgcolor: 'background.paper', width: width, p: '0px' }}>
                            <AppBar position="static">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor='false'
                                    textColor="inherit"
                                    variant="fullWidth"
                                    disableRipple="true"
                                    disableTouchRipple='true'
                                    aria-label="full width tabs example"
                                    sx={{
                                        '& .Mui-selected': {
                                            padding: "0px 63px",
                                            opacity: 1,
                                            backgroundColor: "#fbdd44",
                                            borderRadius: "10px 10px 0 0",
                                            color: "rgb(5 37 85)",
                                            fontWeight: "bold"
                                        },
                                        '& .MuiTabs-scroller': {
                                            backgroundColor: "rgb(255, 255, 255)",
                                            color: "rgb(5 37 85)",
                                            boxShadow: "none",
                                            borderBottom: "5px solid #fbdd44"
                                        },
                                        '& .MuiAppBar-root': {
                                            boxShadow: "none",
                                        }
                                    }}
                                >
                                    <Tab disableRipple label="Loan Requests" {...a11yProps(0)} />
                                    <Tab disableRipple label="Pending Verifications" {...a11yProps(1)} />
                                    <Tab disableRipple label="Verified Borrowers" {...a11yProps(2)} />
                                    <Tab disableRipple label="Investment Allottees" {...a11yProps(3)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                enableMouseEvents
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

                                        <div className='investments'>
                                            {/* <LoanRequest name="" */}
                                            <LoanRequest name="Ahmed Ali" amount="14000" rating="4.5" />
                                            <LoanRequest name="Mohammad Saad" amount="14000" rating="4.5" />
                                            <LoanRequest name="Bilal Khan" amount="14000" rating="4.5" />
                                            <LoanRequest name="Ahsan Raza" amount="14000" rating="4.5" />
                                            <LoanRequest name="Fawad Hassan" amount="14000" rating="4.5" />
                                            <LoanRequest name="Aliza Sheikh" amount="14000" rating="4.5" />

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

                                        <div className='investments'>
                                            <PendingBorrower name="Ahmed Ali" amount="14000" rating="4.5" cancelable="true" />
                                            <PendingBorrower name="Mohammad Saad" amount="14000" rating="4.5" cancelable="true" />
                                            <PendingBorrower name="Bilal Khan" amount="14000" rating="4.5" cancelable="false" />
                                            <PendingBorrower name="Ahsan Raza" amount="14000" rating="4.5" cancelable="false" />
                                            <PendingBorrower name="Fawad Hassan" amount="14000" rating="4.5" cancelable="false" />
                                            <PendingBorrower name="Aliza Sheikh" amount="14000" rating="4.5" cancelable="false" />

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

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
                                </TabPanel>
                                <TabPanel value={value} index={3} dir={theme.direction} sx={{ padding: '10px' }}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

                                        <div className='investments'>
                                            {/* <InvestmentUnit name="Ahmed Ali" /> */}
                                            <InvestmentUnit name="Ahmed Ali" rating="4.5" />
                                            <InvestmentUnit name="Mohammad Saad" rating="4.5" />
                                            <InvestmentUnit name="Bilal Khan" rating="4.5" />
                                            <InvestmentUnit name="Ahsan Raza" rating="4.5" />
                                            <InvestmentUnit name="Fawad Hassan" rating="4.5" />
                                            <InvestmentUnit name="Aliza Sheikh" rating="4.5" />

                                        </div>
                                    </div>
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </div>
                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )
            }
        </>





        // </div>
    )
}



export default Investment