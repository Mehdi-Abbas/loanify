import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import fire from '../helpers/db';
import SettingsIcon from '@mui/icons-material/Settings';
import { LoadingButton } from '@mui/lab';
import Titlebar from '../components/Titlebar';
import NumberFormat from 'react-number-format';
import Login from './Login';
import fire from '../helpers/db';
import Alert from '@mui/material/Alert';
import { number } from 'prop-types';



const theme = createTheme();

const Signup = () => {



    const [amount, setAmount] = useState(0)
    const [loading, setLoad] = useState(false)
    const [fetchedAmount, setFetchedAmount] = useState(0)
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isAdding, setIsAdding] = useState(true);



    // const handleSubmit = (event) => {
    //     setLoad(true)
    //     setTimeout(() => { setLoad(false) }, 10000);
    //     event.preventDefault();

    //     setRegester(true)
    // }

    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'lender')

        fire.database().ref('user/' + localStorage.getItem('user_id')).on('value', (data) => {
            data.val().balance && (setFetchedAmount(data.val().balance))

            setIsDisabled(false)

        })
    }

    useEffect(() => {
        userState();
    }, []);

    const handleSubmit = (event) => {
        setLoad(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setAmount(0)


        // console.log(email)
        let bl = data.get('amount')

        fire.database().ref('user/' + localStorage.getItem('user_id')).update({
            balance: isAdding ? parseInt(bl) + parseInt(fetchedAmount) : parseInt(fetchedAmount) >= parseInt(bl) ? parseInt(fetchedAmount) - parseInt(bl) : parseInt(fetchedAmount)
        })
            .then(() => {

                setIsUpdated(true)
                setTimeout(() => { setIsUpdated(false) }, 3000)
                setLoad(false)
                setIsAdding(true)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    };

    const changeAmount = (e) => {
        setAmount(e.target.value)
    }

    return (
        <>
            {validUser ? (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 'auto', alignItems: 'center', width: '100%' }}>
                        <Titlebar title="Invest Amount" backlink="/dashboardlender" />
                        {isUpdated && <Alert onClose={() => { setIsUpdated(false) }} style={{ position: 'absolute', top: '85px', right: '10px', zIndex: '10' }}>Amount updated</Alert>}
                        <ThemeProvider theme={theme}>
                            <Container component="main" maxWidth="xs">
                                {/* <br /> */}
                                {/* <Link to="/dashboardlender"><ArrowBackIcon /></Link> */}
                                {/* <CssBaseline /> */}
                                <Box
                                    sx={{
                                        marginTop: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <SettingsIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Set up
                                </Typography> */}
                                    <div className="summary">
                                        <div className="row">
                                            <h5>Current Balance</h5>
                                            <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={fetchedAmount} /></p>
                                        </div>
                                    </div>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid container spacing={2} sx={{ mb: 1 }}>
                                            {/* <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    name="bankname"
                                                    fullWidth
                                                    id="bankname"
                                                    label="Bank Name"
                                                    autoFocus
                                                />
                                            </Grid> */}

                                            <Grid item xs={12}>

                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="amout"
                                                    label="Amount"
                                                    name="amount"
                                                    value={amount}
                                                    onChange={changeAmount}
                                                    type="number"
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                                                />
                                                {/* <div style={{ width: '100%', textAlign: 'left', marginTop: '10px', fontSize: '0.8rem' }}>
                                                    *Amount will add in your wallet after the approval
                                                </div> */}
                                            </Grid>


                                        </Grid>
                                        <Box sx={{ display: 'flex', flexDirection:'column' }}>
                                            <LoadingButton
                                                disabled={isDisabled}
                                                type="submit"
                                                variant="contained"
                                                color='success'
                                                loading={loading}
                                                sx={{ mt: 3 }}
                                            >
                                                Add Amount
                                            </LoadingButton>
                                            <LoadingButton
                                                disabled={isDisabled}
                                                type="submit"
                                                color="error"
                                                variant="contained"
                                                sx={{ mt: 2 }}
                                                loading={loading}
                                                onClick={() => { setIsAdding(false) }}
                                            >
                                                Reduce Amount
                                            </LoadingButton>
                                        </Box>


                                    </Box>

                                </Box>

                            </Container>
                        </ThemeProvider>
                    </div>
                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )}
        </>


    );
}

export default Signup