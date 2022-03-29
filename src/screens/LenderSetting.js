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
import TextField from '@mui/material/TextField';
import fire from '../helpers/db';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
// import PropTypes from 'prop-types';


const LenderSetting = () => {
    const { height, width } = UseWindowDimensions();
    const theme = useTheme();

    const [checked, setChecked] = React.useState(true);
    const [fetchedInterest, setFetchedInterest] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [loading, setLoad] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'lender')

        fire.database().ref('user/' + localStorage.getItem('user_id')).once('value').then((data) => {
            data.val().interest && (setFetchedInterest(data.val().interest))
            data.val().public && (setChecked(data.val().public))

            setIsDisabled(false)

        }).catch(function (error) {
            setIsDisabled(false)
            console.log(error);
        });
    }

    const changeInterest = (e) => {
        setFetchedInterest(e.target.value)
    }

    useEffect(() => {
        userState();
    }, []);

    const handleSubmit = (event) => {
        setLoad(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);



        // console.log(email)
        let it = data.get('interest')
        let pb = data.get('public')

        fire.database().ref('user/' + localStorage.getItem('user_id')).update({
            interest: it,
            public: pb,
        })
            .then(() => {
                setIsUpdated(true)
                setTimeout(() => { setIsUpdated(false) }, 3000)
                //setIsSaved(true)
                setLoad(false)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    };
    return (
        <>
            {validUser ? (
                <>
                    <div style={{ minHeight: height, width: width }}>
                        <Titlebar title="Settings" backlink="/dashboardlender/investment" />
                        <br /><br />

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>

                                <Grid item xs={12}>
                                <FormControlLabel control={<Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name="public"
                                    />} label="Public Profile" />
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="interrest"
                                        required
                                        fullWidth
                                        id="interrest"
                                        label="Interest"
                                        value={fetchedInterest || ''}
                                        onChange={changeInterest}
                                    />
                                </Grid>




                            </Grid>
                            <LoadingButton
                                disabled={isDisabled}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={loading}

                            >
                                Save
                            </LoadingButton>

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



export default LenderSetting