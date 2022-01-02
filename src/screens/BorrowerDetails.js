import React from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Titlebar from '../components/Titlebar';
import PersonIcon from '@mui/icons-material/Person';
import NumberFormat from 'react-number-format';
const BorrowerDetails = (props) => {



    return (
        <div style={{width:'100%'}}>
            <Titlebar title="Borrower Profile" backlink="/dashboardlender/investment"/>
            <div style={{display:'flex', margin:'30px 30px 0px 30px'}}>
                <div >
                    <PersonIcon style={{backgroundColor:'#3d95ee', color:'#fbdd44', padding:'0px', borderRadius:'55px', fontSize:'6rem'}}/>
                </div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center',margin:'20px'}}>
                    <h1>Ali Ahmed</h1>
                    <h3>Student</h3>
                </div>
            </div>
            <Box sx={style}>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Gender</h4>
                        <p>Male</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Age</h4>
                        <p>29</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Place of Birth</h4>
                        <p>Quetta</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Nationality</h4>
                        <p>Pakistani</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Current City</h4>
                        <p>Karachi</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Marital Status</h4>
                        <p>Unmarried</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Job Status</h4>
                        <p>Employed</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Monthly Income</h4>
                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={30000} /></p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Language</h4>
                        <p>Urdu</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Contact Number</h4>
                        <p>0348-8745239</p>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="detail">
                        <h4>Rating</h4>
                        <p style={{ display: 'flex' }}>3.5  <StarIcon fontSize='small' /></p>
                    </div>
                </Typography>
                

            </Box>


        </div>
    )
}


const style = {
    margin:'20px 20px',
    border:'2px solid #fbdd44',
    backgroundColor:'#fbdd4433',
    borderRadius:'10px',
    padding:'10px'
};
export default BorrowerDetails