import React, {useEffect} from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
// import StarIcon from '@mui/icons-material/Star';
import fire from '../helpers/db';
import NumberFormat from 'react-number-format';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
// import useWindowDimensions from './Screensize';
const ApprovalRequest = (props) => {
    props=props.props
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [lenderName, setLenderName] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const [openConfirm, setOpenConfirm] = React.useState(false);
    const handleOpenConfirm = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);
    // const { width } = useWindowDimensions();

    const handleCancel=()=>{
        handleClose()
        fire.database().ref('request/' + props._key).update({
            statusCode:"-2"
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

    const handleAccept=()=>{
        handleCloseConfirm()
        handleClose()
        fire.database().ref('request/' + props._key).update({
            statusCode:"2"
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
        fire.database().ref('user/' + props.sender).once('value').then((data) => {
            setName(data.val().name)

        }).catch(function (error) {
            console.log(error);
        });
        fire.database().ref('user/' + props.receiver).once('value').then((data) => {
            setLenderName(data.val().name)

        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <div className="InvestmentList" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <Link onClick={setUser} to="/dashboardlender/investment/borrowerdetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}> */}
                    <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '2.5rem' }}/>
                {/* </Link> */}
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'8px' }} onClick={handleOpenInfo}>
                    <span style={{ fontSize: '0.9rem' }}>{name}</span>
                    <span ><NumberFormat style={{ fontSize:'1rem', fontWeight: 'bold', backgroundColor: 'rgb(72 163 72)', padding: '2px 4px', borderRadius: '5px', color: 'white', width: 'auto' }} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.amount} /></span>
                    {/* <span style={{  fontSize:'1rem',display: 'flex', alignItems: 'center', color: '#0008' }}>{props.rating} <StarIcon fontSize='small' /></span> */}
                </div>


            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '80px' }}>
                <CancelIcon onClick={handleOpen} style={{ color: "rgb(225 69 69)", fontSize: '2rem' }} />
                <CheckCircleIcon onClick={handleOpenConfirm} style={{ color: "rgb(19 154 19)", fontSize: '2rem' }} />

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
                            <h4>Lender</h4>
                            <p>{lenderName}</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Requestor</h4>
                            <p>{name}</p>
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
                            <p style={{ display: 'flex' }}>{props.morgage === true ? "Yes" : "No"}</p>
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
                        <Button variant="contained" onClick={handleCloseInfo}>Close</Button>
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
                            <p>Are you sure you want to decline the loan request?</p>
                        </div>
                    </Typography>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button style={{ margin: '0 10px' }} onClick={handleCancel} variant="contained">Yes</Button>
                        <Button style={{ margin: '0 10px' }} onClick={handleClose} variant="contained">No</Button>
                    </div>

                </Box>
            </Modal>

            <Modal
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h4" component="h2">
                        {props.name}
                    </Typography><br /><br /> */}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }} >
                            {/* <img src="dollar.png" style={{width:'90px'}}/> */}
                            <p>Are you sure you want to approve the loan request?</p>
                        </div>
                    </Typography>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button style={{ margin: '0 10px' }} onClick={handleAccept} variant="contained">Yes</Button>
                        <Button style={{ margin: '0 10px' }} onClick={handleCloseConfirm} variant="contained">No</Button>
                    </div>
                    {/* <div style={{fontSize:'0.9rem', color:'blue', marginTop:'30px'}}>*Learn more about applied VSC and Tax</div> */}

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
export default ApprovalRequest