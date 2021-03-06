import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';
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
import fire from '../helpers/db';



const LenderProfile = (props) => {

    const [validUser, setValidUser] = useState(false);
    const [gender, setGender] = useState()
    const [maritalStatus, setMaritalStatus] = useState()
    const [jobStatus, setJobStatus] = useState()
    const [fetchedName, setFetchedName] = useState()
    const [fetchedNationality, setFetchNationality] = useState()
    const [fetchedCurrentCity, setFetchedCurrentCity] = useState()
    const [fetchedLanguage, setFetchedLanguage] = useState()
    const [fetchedContactNumber, setFetchedContactNumber] = useState()
    const [fetchedAge, setFetchedAge] = useState()
    const [fetchedInterest, setFetchedInterest] = useState()

    function capitalize(str) {
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
    }

    // let { url } = useRouteMatch();
    // console.log(url)
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

            //console.log(data.val())

        })
    }

    useEffect(() => {
        userState();
    }, []);

    return (
        <>
            {validUser ? (
                <>
                    <div style={{ width: '100%' }}>
                        <Titlebar title="My Profile" backlink="/dashboardlender" />
                        <div style={{ display: 'flex', margin: '30px 30px 0px 30px' }}>
                            <div style={{ position: 'relative' }}>
                                <PersonIcon style={{ backgroundColor: '#3d95ee', color: '#fbdd44', padding: '0px', borderRadius: '55px', fontSize: '6rem' }} />
                                <Link to="profile/profileeditor">
                                    <EditIcon style={{ position: 'absolute', left: '70px', fontSize: '2rem', border: '1px solid black', padding: '5px', color: '#000', boxShadow: 'rgba(149, 157, 165, 0.5) 0px 8px 24px', backgroundColor: '#fbdd44', borderRadius: '100%' }} />
                                </Link>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px' }}>
                                <h1>{fetchedName}</h1>
                                {/* <h3>Bussiness Man</h3> */}
                            </div>
                        </div>
                        <Box sx={style}>

                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Gender</h4>
                                    <p>{gender && capitalize(gender)}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Age</h4>
                                    <p>{fetchedAge}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Nationality</h4>
                                    <p>{fetchedNationality}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Current City</h4>
                                    <p>{fetchedCurrentCity}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Marital Status</h4>
                                    <p>{maritalStatus && capitalize(maritalStatus)}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Job Status</h4>
                                    <p>{jobStatus && capitalize(jobStatus)}</p>
                                </div>
                            </Typography>
                            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Monthly Income</h4>
                                    <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={30000} /></p>
                                </div>
                            </Typography> */}
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Language</h4>
                                    <p>{fetchedLanguage}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Contact Number</h4>
                                    <p>{fetchedContactNumber}</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="detail">
                                    <h4>Interest</h4>
                                    <p>{fetchedInterest}%</p>
                                </div>
                            </Typography>


                        </Box>


                    </div>
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
export default LenderProfile