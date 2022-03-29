import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import Titlebar from '../components/Titlebar';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from "./Login"

const DashboardBorrower = () => {
    const { height } = UseWindowDimensions();
    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'borrower')
    }
    const signOut = () => {
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
                        <Titlebar title="Borrower Dashboard" />
                        <br />
                        <div className='iconwrapper'>
                            <Link className='iconframe' to='/dashboardborrower/searchinvestor'>

                                <div className="icon">
                                    <img src="search.png"></img>
                                </div>

                                <span>Search Investor</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardborrower/requesttracking'>

                                <div className="icon">
                                    <img src="wait.png"></img>
                                </div>
                                <span>Request Tracking</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardborrower/approvedloans'>

                                <div className="icon">
                                    <img src="checked.png"></img>
                                </div>
                                <span>Approved Loans</span>

                            </Link>
                            <Link className='iconframe' to='/dashboardborrower/profile'>

                                <div className="icon">
                                    <img src="profile.png"></img>
                                </div>

                                <span>My Profile</span>

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



export default DashboardBorrower