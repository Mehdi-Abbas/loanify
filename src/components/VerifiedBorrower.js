import React, {useEffect} from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
// import StarIcon from '@mui/icons-material/Star';
import fire from '../helpers/db';
import NumberFormat from 'react-number-format';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
// import useWindowDimensions from './Screensize';
const VerifiedBorrower = (props) => {
    props=props.props
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const setUser=()=>{
        localStorage.setItem("requestor_id",props.sender)
        localStorage.setItem("last_page","/dashboardlender/investment")
    };

    const handleLend=()=>{
        // handleCloseConfirm()
        handleClose()
        fire.database().ref('user/' + localStorage.getItem('user_id')).once('value').then((data) => {
            if(data.val().balance && props.amount <= data.val().balance){
                fire.database().ref('user/' + localStorage.getItem('user_id')).update({
                    balance: parseInt(data.val().balance) >= parseInt(props.amount) ? parseInt(data.val().balance) - parseInt(props.amount) : parseInt(data.val().balance)
                })
                fire.database().ref('request/' + props._key).update({
                    statusCode:"3"
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
            }else{
                window.alert("You do not have enough balance, kindly add amount to your wallet.")
            }

        }).catch(function (error) {
            console.log(error);
        });
        
    };

    useEffect(() => {
        fire.database().ref('user/' + props.sender).once('value').then((data) => {
            setName(data.val().name)

        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <div className="InvestmentList" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Link onClick={setUser} to="/dashboardlender/investment/borrowerdetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '10px', position:'relative' }}>
                    <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '2.5rem' }} />
					<VerifiedIcon style={{position:'absolute', left:'24px', bottom:'5px', fontSize:'1rem', color:'#fff', backgroundColor:'#00acee', borderRadius:'100%'}}/>
				</Link>
                <div style={{ display: 'flex', flexDirection: 'column' }} onClick={handleOpenInfo}>
                    <span style={{ fontSize: '0.9rem' }}>{name}</span>
                    <span ><NumberFormat style={{ fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'rgb(72 163 72)', padding: '2px 4px', borderRadius: '5px', color: 'white', width: 'auto' }} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.amount} /></span>
                </div>


            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '80px' }}>
                <Button variant="contained" onClick={handleOpen}>{'Lend'}</Button>

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
                            <p>Are you sure you want to lend this borrower?</p>
                        </div>
                    </Typography>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button style={{ margin: '0 10px' }} onClick={handleLend} variant="contained">Yes</Button>
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
export default VerifiedBorrower