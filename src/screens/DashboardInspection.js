import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import Titlebar from '../components/Titlebar';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from "./Login"

const DashboardInspection = () => {
    const { height } = UseWindowDimensions();
    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'inspection')
    }
    const signOut=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')
        localStorage.removeItem('role')
      }

    useEffect(() => {
        userState();
    }, []);
    return (
        <>
            {validUser ? (
                <>
                    <div className="dashboard" style={{ minHeight: height }}>
                        {/* <Link to="/">LOGOUT</Link> */}
                        {/* <h1>Lender Dashboard</h1> */}
                        <Link to='/'><LogoutIcon onClick={signOut} style={{ position: 'absolute', right: '10px', top: '20px', color: 'white', fontSize: '2rem' }} /></Link>
                        <Titlebar title="Inspection Dashboard" />
                        <br />
                        <div className='iconwrappergrid'>
                            <Link className='iconframe' to='/dashboardinspection/viewlenderrequest'>

                                <div className="icon">
                                    <img src="interview.png"></img>
                                </div>

                                <span>New Lender Requests</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardinspection/viewborrowerrequest'>

                                <div className="icon">
                                    <img src="patient.png"></img>
                                </div>
                                <span>New Borrower Requests</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardinspection/approvedlenderrequest'>

                                <div className="icon">
                                    <img src="immigration.png"></img>
                                </div>

                                <span>Approved Lender Requests</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardinspection/approvedborrowerrequest'>

                                <div className="icon">
                                    <img src="immigration.png"></img>
                                </div>
                                <span>Approved Borrower Requests</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardinspection/rejectedlenderrequest'>

                                <div className="icon">
                                    <img src="fired.png"></img>
                                </div>

                                <span>Rejected Lender Requests</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardinspection/rejectedborrowerrequest'>

                                <div className="icon">
                                    <img src="fired.png"></img>
                                </div>
                                <span>Rejected Borrower Requests</span>

                            </Link>




                        </div>



                    </div>
                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )}
        </>

    )
}



export default DashboardInspection