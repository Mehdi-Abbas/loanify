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
import fire from '../helpers/db';
import { LoadingButton } from '@mui/lab';
import { RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';


const theme = createTheme();

const Signup = () => {
  
   
    
    const [isRegestered, setRegester] = useState(false)
    const [loading, setLoad] = useState(false)
    const [role_, setRole] = useState('lender')

    // const handleSubmit = (event) => {
    //     setLoad(true)
    //     setTimeout(() => { setLoad(false) }, 10000);
    //     event.preventDefault();

    //     setRegester(true)
    // }

    const handleChange = (e) => {
        setRole(e.target.value)
    }

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
       
       
        
        // console.log(email)
        let em = data.get('email').toUpperCase()
        let pass = data.get('password')
        let nm = data.get('name').toUpperCase()
        if (em.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (pass.length < 4) {
            alert('Please enter a password.');
            return;
        }
       
        fire.auth().createUserWithEmailAndPassword(em, pass)
            .then(
                (res) => {
                    // console.log(res)
                    fire.database().ref('user').push({
                        email: em,
                        name: nm,
                        auth_id:res.user.uid,
                        role: role_
                    })
                    .then((docRef) => {
                        console.log(docRef._delegate._path.pieces_[1])
                        localStorage.setItem('user_id',docRef._delegate._path.pieces_[1])
                    })
                    setRegester(true)
                }

            )
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });


        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
    };

    return (
        <>
            {isRegestered ? <Redirect to="/" /> : <>
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
                            className="formbox"
                        >
                            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                
                            </Avatar> */}
                            <div>
                                <img src="loanify logo 2.png" style={{width:'180px'}}/>
                            </div>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2} sx={{ justifyContent:'center'}}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Full Name"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Role</FormLabel> */}
                                    <RadioGroup row
                                        aria-label="role"
                                        defaultValue="lender"
                                        value={role_}
                                        name="controlled-radio-buttons-group"
                                        onChange={handleChange}
                                        sx={{mt:1}}
                                    >
                                        <FormControlLabel value="lender" control={
                                            <Radio
                                                checked={role_==='lender'}
                                            />}
                                            label="Lender" />
                                        <FormControlLabel value="borrower" control={
                                            <Radio/>} label="Borrower" />
                                        <FormControlLabel value="inspection" control={
                                            <Radio/>} label="Inpection" />

                                    </RadioGroup>
                                </FormControl>
                                    
                                </Grid>
                                <LoadingButton
                                    disable={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={loading}
                                    
                                >
                                    Sign Up
                                </LoadingButton>
                                
                            </Box>
                            <br />
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Box>
                       
                    </Container>
                </ThemeProvider>

            </>}
        </>

    );
}

export default Signup