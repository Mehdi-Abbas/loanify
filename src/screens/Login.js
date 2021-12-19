import { useState } from 'react'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import fire from '../helpers/db';
// import { useDispatch, useSelector } from 'react-redux';
// import { OnSubmit } from '../Redux/Action/Action';
import { LoadingButton } from '@mui/lab';
import { Radio } from '@mui/material';
import { FormLabel } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { useRadioGroup } from '@mui/material/RadioGroup';
const theme = createTheme();

const Login = (props) => {

    let { path } = useRouteMatch();

    const [isLoggedin, setLoggedin] = useState(false)
    const [loading, setLoad] = useState(false)
    const [role, setRole] = useState('lender')

    // let role=undefined

    const handleChange = (e) => {
        setRole(e.target.value)
    }

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();

        setLoggedin(true)
    }

    // const handleSubmit = (event) => {
    //     setLoad(true)
    //     setTimeout(() => { setLoad(false) }, 10000);
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     // eslint-disable-next-line no-console




    //     let em = data.get('email')
    //     let pass = data.get('password')

    //     OnSubmit_(em)
    //     console.log(dataValue)
    //     if (em.length < 4) {
    //         alert('Please enter an email address.');
    //         return;
    //     }
    //     if (pass.length < 4) {
    //         alert('Please enter a password.');
    //         return;
    //     }
    //     // Create user with email and pass.
    //     fire.auth().signInWithEmailAndPassword(em, pass)
    //         .then((result) => {
    //             localStorage.setItem("role",'student')

    //             fire.database().ref('student').once('value').then ((snapshot) => {
    //                 const students = snapshot.val();
    //                 for (let id in students) {
    //                     if(students[id].auth_id===result.user.uid){
    //                         localStorage.setItem("student_id",id)
    //                         localStorage.setItem("role", 'student')
    //                         localStorage.setItem('user', data);
    //                     };
    //                 }
    //             });

    //             // const token = result.credential.accessToken;
    //             const user = result.user;
    //             const data = user.email

    //             localStorage.setItem('user', data);
    //             props.signin(data);
    //             console.log("logged in")
    //             setLoggedin(true)
    //         })
    //         .catch(function (error) {
    //             // Handle Errors here.
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             if (errorCode === 'auth/wrong-password') {
    //                 alert('Wrong password.');
    //             } else {
    //                 alert(errorMessage);
    //             }
    //             console.log(error);
    //             //   document.getElementById('quickstart-sign-in').disabled = false;
    //         });


    //     // console.log({
    //     //     email_: em,
    //     //     password_: pass,
    //     // });
    // };

    return (
        <>
            {!isLoggedin ? <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <br />
                        <Link to="/"><ArrowBackIcon /></Link>

                        <CssBaseline />

                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Role</FormLabel> */}
                                    <RadioGroup row
                                        aria-label="role"
                                        defaultValue="lender"
                                        value={role}
                                        name="controlled-radio-buttons-group"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="lender" control={
                                            <Radio
                                                checked={role==='lender'}
                                            />}
                                            label="Lender" />
                                        <FormControlLabel value="borrower" control={
                                            <Radio/>} label="Borrower" />

                                    </RadioGroup>
                                </FormControl>

                                <LoadingButton
                                    disable={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={loading}

                                >
                                    Login
                                </LoadingButton>
                            </Box>
                            <br />
                            <Link to={`/signup`}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            <br />
                            <Link to={`/forgetpassword`}>
                                Forgot password?
                            </Link>
                        </Box>

                    </Container>
                </ThemeProvider>
            </> :
                <>
                    {role === 'borrower' ? <Redirect to={`/dashboardborrower`} />:<Redirect to={`/dashboardlender`} />}
                </>
            }
        </>
    );
}

export default Login