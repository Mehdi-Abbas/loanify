import React from 'react'
import Container from '@mui/material/Container';
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import Titlebar from '../components/Titlebar';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardBorrower = () => {
    const { height } = UseWindowDimensions();
    return (
        <div className="dashboard" style={{ minHeight: height }}>
            {/* <Link to="/">LOGOUT</Link> */}
            {/* <h1>Lender Dashboard</h1> */}
            <Link to='/'><LogoutIcon style={{ position: 'absolute', right: '10px', top: '20px', color: 'white', fontSize: '2rem' }} /></Link>
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
    )
}



export default DashboardBorrower