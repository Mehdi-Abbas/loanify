import React from 'react'
import Container from '@mui/material/Container';
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'

const DashboardLender = () => {
    const { height } = UseWindowDimensions();
    return (
        <div className="dashboard" style={{ height: height }}>
            {/* <br /> */}
            <Link to="/">LOGOUT</Link>
            <h1>Borrower Dashboard</h1>
            <div className='iconwrapper'>
                <div className='iconframeborrower'>
                    <div className="icon">
                        <img src="settings.png"></img>
                    </div>
                    <br/>
                    <span>Setup</span>

                </div>
                <div className='iconframeborrower'>
                    <div className="icon">
                        <img src="money.png"></img>
                    </div>
                    <span>Current <br />Investments</span>
                </div>
                <div className='iconframeborrower'>
                    <div className="icon">
                        <img src="search.png"></img>
                    </div>
                    <br/>
                    <span>Search</span>
                </div>
                <div className='iconframeborrower'>
                    <div className="icon">
                        <img src="wait.png"></img>
                    </div>
                    <span>Request <br />Status</span>
                </div>
                <div className='iconframeborrower'>
                    <div className="icon">
                        <img src="profile.png"></img>
                    </div>
                    <br/>
                    <span>Profile</span>
                </div>
                <div className='iconframeborrower'>
                    <div className="icon">
                        <img src="about.png"></img>
                    </div>
                    <br/>
                    <span>About</span>
                </div>

            </div>



        </div>
    )
}



export default DashboardLender