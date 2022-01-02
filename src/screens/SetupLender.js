import { useState } from 'react'
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


const theme = createTheme();

const Signup = () => {



    const [isRegestered, setRegester] = useState(false)
    const [loading, setLoad] = useState(false)


    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();

        setRegester(true)
    }

    // const handleSubmit = (event) => {
    //     setLoad(true)
    //     setTimeout(() => { setLoad(false) }, 10000);
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);



    //     // console.log(email)
    //     let em = data.get('email').toUpperCase()
    //     let pass = data.get('password')
    //     let id__ = em.substring(0, 4) + '-' + em.substring(4, 8) + '-' + em.substring(8, 12)
    //     let nm = data.get('name').toUpperCase()
    //     if (em.length < 4) {
    //         alert('Please enter an email address.');
    //         return;
    //     }
    //     if (pass.length < 4) {
    //         alert('Please enter a password.');
    //         return;
    //     }

    //     fire.auth().createUserWithEmailAndPassword(em, pass)
    //         .then(
    //             (res) => {
    //                 // console.log(res)
    //                 fire.database().ref('student').push({
    //                     email: em,
    //                     student_id: id__,
    //                     name: nm,
    //                     auth_id:res.user.uid
    //                 })
    //                 .then((docRef) => {
    //                     localStorage.setItem('student_id',docRef.path.pieces_[1])
    //                 })
    //                 setRegester(true)
    //             }

    //         )
    //         .catch(function (error) {
    //             // Handle Errors here.
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             if (errorCode === 'auth/weak-password') {
    //                 alert('The password is too weak.');
    //             } else {
    //                 alert(errorMessage);
    //             }
    //             console.log(error);
    //         });


    //     // console.log({
    //     //     email: data.get('email'),
    //     //     password: data.get('password'),
    //     // });
    // };

    return (
        <>
            {isRegestered ? <Redirect to="/dashboardlender" /> : <>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 'auto', alignItems: 'center', width:'100%' }}>
                    <Titlebar title="Invest Amount" backlink="/dashboardlender" />
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
                                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={23678100} /></p>
                                    </div>
                                </div>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                name="bankname"
                                                required
                                                fullWidth
                                                id="bankname"
                                                label="Bank Name"
                                                autoFocus
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            
                                            <TextField
                                                required
                                                fullWidth
                                                id="amout"
                                                label="Amount"
                                                name="amount"

                                            />
                                            <div style={{width:'100%', textAlign:'left', marginTop:'10px', fontSize:'0.8rem'}}>
                                                *Amount will add in your wallet after the approval
                                            </div>
                                        </Grid>


                                    </Grid>
                                    <LoadingButton
                                        disable={loading}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        loading={loading}

                                    >
                                        Request Approval
                                    </LoadingButton>

                                </Box>

                            </Box>

                        </Container>
                    </ThemeProvider>
                </div>

            </>}
        </>

    );
}

export default Signup