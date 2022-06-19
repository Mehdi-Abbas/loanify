import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import { Radio } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import StarIcon from '@mui/icons-material/Star';
// import CancelIcon from '@mui/icons-material/Cancel';
// import StarIcon from '@mui/icons-material/Star';
import fire from '../helpers/db';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import NumberFormat from 'react-number-format';
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
// import useWindowDimensions from './Screensize';
const Invester = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSent, setIsSent] = React.useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoad] = useState(false)
    const [amount, setAmount] = useState(0)
    const [paymentMode, setPaymentMode] = useState('Bank Transfer')
    const [tenure, setTenure] = useState(1)
    const [interest, setInterest] = useState(1)
    const [morgage, setMorgage] = useState(false)
    const [terms, setTerms] = useState(true)


    const handleRequest = () => {
        setIsSent(!isSent)
    }
    const changeAmount = (e) => {
        setAmount(e.target.value)
    }
    const changeTenure = (e) => {
        setTenure(e.target.value)
    }
    const changePayment = (e) => {
        setPaymentMode(e.target.value)
    }
    const changeInterest = (e) => {
        setInterest(e.target.value)
    }
    const changeMorgage = (e) => {
        setMorgage(e.target.checked)
    }
    const changeTerms = (e) => {
        console.log(e.target.checked)
        setTerms(e.target.checked)
    }
    const handleSubmit = (event) => {
        setLoad(true)
        setIsDisabled(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);



        // console.log(email)
        let am = data.get('amount')
        let pm = data.get('paymentMode')
        let tn = data.get('tenure')
        let it = data.get('interest')
        let mg = morgage
        let tm = terms

        //console.log(mg)
        fire.database().ref('request').push({
            amount: am,
            paymentMode: pm,
            tenure: tn,
            interest: it,
            morgage: mg,
            terms: tm,
            sender: localStorage.getItem('user_id'),
            receiver: props._key || '',
            timeStamp: Date.now(),
            statusCode: "0"
        })
            .then((data) => {
                // setIsUpdated(true)
                // setTimeout(() => { setIsUpdated(false) }, 3000)
                // setIsSaved(true)
                handleRequest()
                setLoad(false)
                handleClose()
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    }

    useEffect(()=>{
        fire.database().ref('request').once('value').then((data) => {
            data.forEach(child => {
                if(child.val().sender === localStorage.getItem("user_id") && child.val().receiver === props._key && (child.val().statusCode === '0' || child.val().statusCode === '1')){
                    setIsSent(true)
                }
            });

        })
    },[])



    return (
        <div className="InvestmentList" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <Link to="/dashboardlender/investment/borrowerdetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}> */}
                <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '2.5rem' }} />
                {/* </Link> */}
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 5 }}>
                    <span style={{ fontSize: '1rem' }}>{props.name}</span>
                    <span style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', color: '#0008' }}><span style={{ fontSize: '0.7rem', fontWeight: '600', marginRight: '2px' }}>Interest</span>{props.interest}%</span>
                </div>


            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '80px' }}>
                <Button disabled={isSent} variant="contained" onClick={handleOpen} sx={{ textTransform: 'none' }}>Send Request</Button>

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid item xs={12}>
                            <TextField
                                name="amount"
                                required
                                fullWidth
                                type='number'
                                id="amount"
                                label="Amount (PKR)"
                                value={amount}
                                onChange={changeAmount}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl >
                                <InputLabel id="demo-simple-select-label">Payment Mode</InputLabel>
                                <Select
                                    labelId="paymentMode"
                                    id="paymentMode"
                                    name="paymentMode"
                                    value={paymentMode}
                                    label="Payment Mode"
                                    onChange={changePayment}
                                >
                                    <MenuItem value={'Bank Transfer'}>Bank Transfer</MenuItem>
                                    <MenuItem value={'Cheque'}>Cheque</MenuItem>
                                    <MenuItem value={'Cash'}>Cash</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="tenure"
                                required
                                fullWidth
                                type='number'
                                id="tenure"
                                label="Tenure (months)"
                                value={tenure}
                                onChange={changeTenure}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="interest"
                                required
                                fullWidth
                                type='number'
                                id="interest"
                                label="Interest (%)"
                                value={interest}
                                onChange={changeInterest}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={
                                <Switch
                                    name="morgage"
                                    checked={morgage}
                                    onChange={changeMorgage}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                                label="Morgage"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={
                                <Switch
                                    name="terms"
                                    checked={terms}
                                    onChange={changeTerms}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                                label="Terms Negotialble"
                            />
                        </Grid>


                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <LoadingButton
                            disabled={isDisabled}
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
                            loading={loading}

                        >
                            Confirm
                        </LoadingButton>
                    </Grid>


                </Box>
            </Modal>





        </div>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #fbdd44',
    boxShadow: 24,
    p: 4,
};
export default Invester