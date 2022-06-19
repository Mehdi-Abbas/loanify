import React, { useState, useEffect } from 'react'
import { Button, useFormControl } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Titlebar from '../components/Titlebar';
import PersonIcon from '@mui/icons-material/Person';
import NumberFormat from 'react-number-format';
import EditIcon from '@mui/icons-material/Edit';
import Login from './Login';
import Alert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import { RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fire from '../helpers/db';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { Redirect } from 'react-router-dom';

const theme = createTheme();

const LenderProfileEditor = (props) => {

    const [validUser, setValidUser] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [loading, setLoad] = useState(false)
    const [gender, setGender] = useState('female')
    const [maritalStatus, setMaritalStatus] = useState('single')
    const [jobStatus, setJobStatus] = useState('unemployed')
    const [fetchedName, setFetchedName] = useState()
    const [fetchedNationality, setFetchNationality] = useState()
    const [fetchedCurrentCity, setFetchedCurrentCity] = useState()
    const [fetchedLanguage, setFetchedLanguage] = useState()
    const [fetchedContactNumber, setFetchedContactNumber] = useState()
    const [fetchedAge, setFetchedAge] = useState()
    const [fetchedInterest, setFetchedInterest] = useState()



    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'lender')

        fire.database().ref('user/' + localStorage.getItem('user_id')).once('value').then((data) => {
            data.val().name && (setFetchedName(data.val().name))
            data.val().age && (setFetchedAge(data.val().age))
            data.val().nationality && (setFetchNationality(data.val().nationality))
            data.val().currentCity && (setFetchedCurrentCity(data.val().currentCity))
            data.val().language && (setFetchedLanguage(data.val().language))
            data.val().contactNumber && (setFetchedContactNumber(data.val().contactNumber))
            data.val().gender && (setGender(data.val().gender.toLowerCase()))
            data.val().maritalStatus && (setMaritalStatus(data.val().maritalStatus.toLowerCase()))
            data.val().jobStatus && (setJobStatus(data.val().jobStatus.toLowerCase()))
            data.val().interest && (setFetchedInterest(data.val().interest.toLowerCase()))

            setIsDisabled(false)

        }).catch(function (error) {
            setIsDisabled(false)
            console.log(error);
        });
    }

    useEffect(() => {
        userState();
    }, []);

    const changeGender = (e) => {
        setGender(e.target.value)
    }
    const changeJobStatus = (e) => {
        setJobStatus(e.target.value)
    }
    const changeMaritalStatus = (e) => {
        setMaritalStatus(e.target.value)
    }
    const changeName = (e) => {
        setFetchedName(e.target.value)
    }
    const changeAge = (e) => {
        setFetchedAge(e.target.value)
    }
    const changeNationality = (e) => {
        setFetchNationality(e.target.value)
    }
    const changeCurrentCity = (e) => {
        setFetchedCurrentCity(e.target.value)
    }
    const changeLanguage = (e) => {
        setFetchedLanguage(e.target.value)
    }
    const changeContactNumber = (e) => {
        setFetchedContactNumber(e.target.value)
    }
    const changeInterest = (e) => {
        setFetchedInterest(e.target.value)
    }

    const handleSubmit = (event) => {
        setLoad(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);



        // console.log(email)
        let nm = data.get('name')
        let ag = data.get('age')
        let gd = data.get('gender')
        let nt = data.get('nationality')
        let ct = data.get('currentCity')
        let lg = data.get('language')
        let cn = data.get('contactNumber')
        let mr = data.get('maritalStatus')
        let jb = data.get('jobStatus')
        let it = data.get('interest')

        fire.database().ref('user/' + localStorage.getItem('user_id')).update({
            name: nm,
            age: ag,
            gender: gd,
            nationality: nt,
            currentCity: ct,
            language: lg,
            contactNumber: cn,
            maritalStatus: mr,
            jobStatus: jb,
            interest:it
        })
            .then(() => {
                setIsUpdated(true)
                setTimeout(() => { setIsUpdated(false) }, 3000)
                setIsSaved(true)
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

    const countries = [
        { label: 'Pakistan' },
    ]

    const cities = [
        { label: 'Karachi' },
        { label: 'Islamabad' },
        { label: 'Lahore' },
        { label: 'Quetta' },
        { label: 'Multan' },
        { label: 'Peshawer' },
    ]

    const languages = [
        { label: 'Urdu' },
        { label: 'English' },
    ]

    return (
        <>
            {validUser ? (
                <>
                    {!isSaved ? (<>
                        <ThemeProvider theme={theme} >
                            <Titlebar title="Edit Profile" backlink="/dashboardlender/profile" />
                            {isUpdated && <Alert onClose={() => { setIsUpdated(false) }} style={{ position: 'absolute', top: '85px', right: '10px', zIndex: '10' }}>Profile updated successfully!</Alert>}
                            <Container component="main">
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
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="name"
                                                    required
                                                    fullWidth
                                                    id="name"
                                                    label="Full Name"
                                                    value={fetchedName || ''}
                                                    onChange={changeName}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="age"
                                                    label="Age"
                                                    type="number"
                                                    value={fetchedAge || ''}
                                                    onChange={changeAge}
                                                    id="age"
                                                    autoComplete="age"
                                                    InputProps={{
                                                        inputProps: {
                                                            max: 100, min: 18
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <div style={{ width: '100%', textAlign: 'left', margin: '10px 16px' }}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Gender</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-label="gender"
                                                        defaultValue="female"
                                                        value={gender}
                                                        name="gender"
                                                        onChange={changeGender}
                                                    // sx={{ mt: 1 }}
                                                    >
                                                        <FormControlLabel value="female" control={
                                                            <Radio
                                                                checked={gender === 'female'}
                                                            />}
                                                            label="Female" />
                                                        <FormControlLabel value="male" control={
                                                            <Radio />} label="Male" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    name="nationality"
                                                    label="Nationality"
                                                    type="text"
                                                    id="nationality"
                                                    autoComplete="nationality"
                                                    value={fetchedNationality || ''}
                                                    onChange={changeNationality}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="currentCity"
                                                    label="Current City"
                                                    type="text"
                                                    id="currentCity"
                                                    autoComplete="currentCity"
                                                    value={fetchedCurrentCity || ''}
                                                    onChange={changeCurrentCity}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="interest"
                                                    label="Interest"
                                                    type="text"
                                                    id="interest"
                                                    autoComplete="interest"
                                                    value={fetchedInterest || ''}
                                                    onChange={changeInterest}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="language"
                                                    label="Language"
                                                    type="text"
                                                    id="language"
                                                    autoComplete="language"
                                                    value={fetchedLanguage || ''}
                                                    onChange={changeLanguage}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="contactNumber"
                                                    label="Contact Number"
                                                    type="text"
                                                    id="contactNumber"
                                                    autoComplete="contactNumber"
                                                    value={fetchedContactNumber || ''}
                                                    onChange={changeContactNumber}
                                                />
                                            </Grid>
                                            <div style={{ width: '100%', textAlign: 'left', margin: '10px 16px' }}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Marital Status</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-label="maritalStatus"
                                                        defaultValue="single"
                                                        value={maritalStatus}
                                                        name="maritalStatus"
                                                        onChange={changeMaritalStatus}
                                                    // sx={{ mt: 1 }}
                                                    >
                                                        <FormControlLabel value="single" control={
                                                            <Radio
                                                                checked={maritalStatus === 'single'}
                                                            />}
                                                            label="Single" />
                                                        <FormControlLabel value="married" control={
                                                            <Radio />} label="Married" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div style={{ width: '100%', textAlign: 'left', margin: '10px 16px' }}>

                                                <FormControl >
                                                    <InputLabel id="demo-simple-select-label">Job Status</InputLabel>
                                                    <Select
                                                        labelId="jobStatus"
                                                        id="jobStatus"
                                                        name="jobStatus"
                                                        value={jobStatus}
                                                        label="Job Status"
                                                        onChange={changeJobStatus}
                                                    >
                                                        <MenuItem value={'unemployed'}>Unemployed</MenuItem>
                                                        <MenuItem value={'employed'}>Employed</MenuItem>
                                                        <MenuItem value={'business'}>Business</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>


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
                                </Box>

                            </Container>
                        </ThemeProvider>
                    </>) : <Redirect to="/dashboardlender/profile" />}

                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )}
        </>

    )
}


const style = {
    margin: '20px 20px',
    border: '2px solid #fbdd44',
    backgroundColor: '#fbdd4433',
    borderRadius: '10px',
    padding: '10px'
};
export default LenderProfileEditor