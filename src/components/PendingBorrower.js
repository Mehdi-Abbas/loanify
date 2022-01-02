import React from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
// import StarIcon from '@mui/icons-material/Star';

import NumberFormat from 'react-number-format';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
// import useWindowDimensions from './Screensize';
const PendingBorrower = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    

    return (
        <div className="InvestmentList" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Link to="/dashboardlender/investment/borrowerdetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                    <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '2.5rem' }} />
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column' }} onClick={handleOpenInfo}>
                    <span style={{ fontSize: '1.2rem' }}>{props.name}</span>
                    <span ><NumberFormat style={{ fontWeight: 'bold', backgroundColor: 'rgb(72 163 72)', padding: '4px 8px', borderRadius: '5px', color: 'white', width: 'auto' }} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.amount} /></span>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#0008' }}>{props.rating} <StarIcon fontSize='small' /></span>
                </div>


            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '80px' }}>
                {props.cancelable ==="true" ? <Button variant="contained" onClick={handleOpen}>Cancel</Button>:<div style={{fontSize:'1rem', fontStyle:'italic', color:'#666'}}>In progress...</div>}

            </div>
            {/* <Button onClick={handleOpen} variant="contained">Details</Button> */}

            <Modal
                open={openInfo}
                onClose={handleCloseInfo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Request Details
                    </Typography><br /><br />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Amount</h4>
                            <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={14000} /></p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Payment Mode</h4>
                            <p>Bank Transfer</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Minimun Tenure</h4>
                            <p>5 Months</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Maximun Interest</h4>
                            <p style={{ display: 'flex' }}>20%</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Morgage</h4>
                            <p style={{ display: 'flex' }}>No</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Terms Negotiable</h4>
                            <p style={{ display: 'flex' }}>Yes</p>
                        </div>
                    </Typography>
                    <br /><br />
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button variant="contained" onClick={handleCloseInfo}>ok</Button>
                    </div>

                </Box>
            </Modal>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h4" component="h2">
                        {props.name}
                    </Typography><br /><br /> */}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }} >
                            <p>Are you sure you want to cancel the verification request?</p>
                        </div>
                    </Typography>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button style={{ margin: '0 10px' }} onClick={handleClose} variant="contained">Yes</Button>
                        <Button style={{ margin: '0 10px' }} onClick={handleClose} variant="contained">No</Button>
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
export default PendingBorrower