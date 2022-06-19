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
const InvesterTracking = (props) => {
    props = props.props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSent, setIsSent] = React.useState(false);
    const [lenderName, setLenderName] = useState();
    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const handleCancel = () => {
        fire.database().ref('request/' + props._key).update({
            statusCode: "-1"
        })
            .then(() => {
                window.location.reload()
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    };


    useEffect(() => {
        fire.database().ref('user').once('value').then((data) => {
            data.forEach(child => {
                if (child.key === props.receiver) {
                    setLenderName(child.val().name)
                }
            });

        })
    }, [])



    return (
        <div className="InvestmentList" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <Link to="/dashboardlender/investment/borrowerdetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}> */}
                <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '2.5rem' }} />
                {/* </Link> */}
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 5 }} onClick={handleOpen}>
                    <span style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', color: '#0008' }}>{lenderName}</span>
                    <span style={{ fontSize: '1rem' }}><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.amount} /></span>
                </div>


            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '80px' }}>
                {
                    props.statusCode === "0" ?
                        <Button disabled={isSent} variant="contained" onClick={handleOpenInfo} sx={{ textTransform: 'none' }}>Cancel</Button> :
                        props.statusCode === "1" && <div style={{fontSize:'1rem', fontStyle:'italic', color:'#666'}}>In progress...</div>
                }

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Request Details
                    </Typography><br /><br />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Lender</h4>
                            <p>{lenderName}</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Amount</h4>
                            <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.amount} /></p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Payment Mode</h4>
                            <p>{props.paymentMode}</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Minimun Tenure</h4>
                            <p>{props.tenure} Month(s)</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Maximun Interest</h4>
                            <p style={{ display: 'flex' }}>{props.interest}%</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Morgage</h4>
                            <p style={{ display: 'flex' }}>{props.morgage === false ? "No" : "Yes"}</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Terms Negotiable</h4>
                            <p style={{ display: 'flex' }}>{props.terms === false ? "No" : "Yes"}</p>
                        </div>
                    </Typography>
                    <br /><br />
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button variant="contained" onClick={handleClose} sx={{ textTransform: 'none' }}>Close</Button>
                    </div>

                </Box>
            </Modal>

            <Modal
                open={openInfo}
                onClose={handleCloseInfo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h4" component="h2">
                        {props.name}
                    </Typography><br /><br /> */}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }} >
                            <p>Are you sure you want to decline the loan request?</p>
                        </div>
                    </Typography>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button style={{ margin: '0 10px' }} onClick={handleCancel} variant="contained">Yes</Button>
                        <Button style={{ margin: '0 10px' }} onClick={handleCloseInfo} variant="contained">No</Button>
                    </div>

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
export default InvesterTracking