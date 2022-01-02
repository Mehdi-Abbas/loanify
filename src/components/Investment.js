import React from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
// import NumberFormat from 'react-number-format';
import VerifiedIcon from '@mui/icons-material/Verified';


const Investment = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className="InvestmentList">
            <div style={{  display: 'flex', flexDirection: 'row', width:'100%' }}>
                <Link to="/dashboardlender/investment/borrowerdetails" style={{ position:'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                    <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '2.5rem' }} />
                    <VerifiedIcon style={{position:'absolute', right:'0px', bottom:'10px', fontSize:'1rem', color:'#fff', backgroundColor:'#00acee', borderRadius:'100%'}}/>
                </Link>
                <Link to="/dashboardlender/investment/allinvestments" style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
                    <span style={{ fontSize: '1.2rem' }}>{props.name}</span>
                    {/* <span ><NumberFormat style={{ fontWeight: 'bold', backgroundColor: '#3d95ee', padding: '4px 8px', borderRadius: '5px', color: 'white', width: 'auto' }} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.amount} /></span> */}
                    <span style={{ display: 'flex', alignItems: 'center', color: '#0008' }}>{props.rating} <StarIcon fontSize='small' /></span>
                </Link>


            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '80px' }}>
                <Button variant="contained" onClick={handleOpen}>Details</Button> 

            </div> */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {props.name}
                    </Typography><br /><br />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>NIC:</h4>
                            <p>42201-8716219-8</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Date of Birth:</h4>
                            <p>3rd July 1991</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>City:</h4>
                            <p>Karachi</p>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="detail">
                            <h4>Rating:</h4>
                            <p style={{ display: 'flex' }}>3.5  <StarIcon fontSize='small' /></p>
                        </div>
                    </Typography>
                    <br /><br />
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Link to='/dashboardlender/investment/allinvestments'><Button variant="contained">All Loans</Button></Link>
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
export default Investment