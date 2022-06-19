import React, { useState, useEffect } from 'react'
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/Investment'
import Titlebar from '../components/Titlebar';
import { Tab, Tabs } from '@mui/material';
// import { TabPanel } from '@mui/lab';
import fire from '../helpers/db';
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
    const [requests, setRequest] = useState([])
    const [pendingApprovals, setPendingApprovals] = useState([])
    const [verifiedBorrowers, setVerifiedBorrowers] = useState([])
    const [investmentAllottees, setInvestmentAllottees] = useState([])
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
        var temp1=[]
        var temp2=[]
        var temp3=[]
        var temp4=[]

        setValidUser(userEmail && userRole && userRole === 'lender')

        
        fire.database().ref('request').once('value').then((data) => {
            data.forEach(child => {
                if(child.val().receiver === localStorage.getItem("user_id")){
                    switch(child.val().statusCode){
                        case "0":
                            temp1.push({...child.val(), _key:child.key})
                            break;
                        case "1":
                            temp2.push({...child.val(), _key:child.key})
                            break;
                        case "2":
                            temp3.push({...child.val(), _key:child.key})
                            break;
                        case "3":
                            temp4.push({...child.val(), _key:child.key})
                            break;
                    }
                }
            });
            setRequest(temp1)
            setPendingApprovals(temp2)
            setVerifiedBorrowers(temp3)
            setInvestmentAllottees(temp4)

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
                        <Titlebar title="Loans" backlink="/dashboardlender" />
                        <Box sx={{ bgcolor: 'background.paper', width: width, p: '0px' , mt:4}}>
                            <AppBar position="static">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor={false}
                                    textColor="inherit"
                                    variant="fullWidth"
                                    disableripple="true"
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
                                    <Tab disableripple label="Loan Requests" {...a11yProps(0)} />
                                    <Tab disableripple label="Pending Verifications" {...a11yProps(1)} />
                                    <Tab disableripple label="Verified Borrowers" {...a11yProps(2)} />
                                    <Tab disableripple label="Investment Allottees" {...a11yProps(3)} />
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
                                            {requests.length > 0 ?
                                                requests.map((item, key) => {
                                                    if (item.statusCode === '0') {
                                                        return (
                                                            <LoanRequest key={key} props={item} />
                                                        )
                                                    }

                                                }):
                                                "No request found"
                                            }

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

                                        <div className='investments'>
                                            {pendingApprovals.length > 0 ?
                                                pendingApprovals.map((item, key) => {
                                                    if (item.statusCode === "1") {
                                                        return (
                                                            <PendingBorrower key={key} props={item} />
                                                        )
                                                    }

                                                }):
                                                "No pending verification found"
                                            }
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

                                        <div className='investments'>
                                            {/* <VerifiedBorrower */}
                                            {verifiedBorrowers.length > 0 ?
                                                verifiedBorrowers.map((item, key) => {
                                                    if (item.statusCode === "2") {
                                                        return (
                                                            <VerifiedBorrower key={key} props={item} />
                                                        )
                                                    }

                                                }):
                                                "No verified borrower found"
                                            }

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={3} dir={theme.direction} sx={{ padding: '10px' }}>
                                    <div className="investmentContainer" style={{ margin: '-24px', width: width }}>

                                        <div className='investments'>
                                            {/* <InvestmentUnit name="Ahmed Ali" /> */}
                                            {investmentAllottees.length > 0 ?
                                                investmentAllottees.map((item, key) => {
                                                    if (item.statusCode === "3") {
                                                        return (
                                                            <InvestmentUnit key={key} props={item} />
                                                        )
                                                    }

                                                }):
                                                "No investment allottees found"
                                            }

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