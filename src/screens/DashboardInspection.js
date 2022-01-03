import React from 'react'
import Container from '@mui/material/Container';
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import Titlebar from '../components/Titlebar';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardInspection = () => {
    const { height } = UseWindowDimensions();
    return (
        <div className="dashboard" style={{ minHeight: height }}>
            {/* <Link to="/">LOGOUT</Link> */}
            {/* <h1>Lender Dashboard</h1> */}
            <Link to='/'><LogoutIcon style={{position:'absolute', right:'10px', top:'20px', color:'white', fontSize:'2rem'}}/></Link>
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
    )
}



export default DashboardInspection