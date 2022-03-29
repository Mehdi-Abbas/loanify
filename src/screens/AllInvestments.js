import React, { useState, useEffect } from 'react'
import UseWindowDimensions from '../components/Screensize';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/InvestmentDetail'
import NumberFormat from 'react-number-format';
import Titlebar from '../components/Titlebar';
import Login from './Login';
const AllInvestment = () => {
    const { height } = UseWindowDimensions();

    const [validUser, setValidUser] = useState(false);

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'lender')
    }

    useEffect(() => {
        userState();
    }, []);

    return (
        <>
            {validUser ? (
                <>
                    <div className="investmentContainer" style={{ minHeight: height }}>
                        <Titlebar title="All Loans" backlink="/dashboardlender/investment" />
                        <div className='investments'>
                            <div className="summary">
                                <div className="row">
                                    <h5>Total Amount Invested</h5>
                                    <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={23678100} /></p>
                                </div>
                                <div className="row">
                                    <h5>Total Amount Returned</h5>
                                    <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={236100} /></p>
                                </div>
                            </div>
                            <InvestmentUnit date="08/12/21" principal="17000" returned="12036" />
                            <InvestmentUnit date="08/12/21" principal="875869" returned="12720" />
                            <InvestmentUnit date="08/12/21" principal="175800" returned="12720" />
                            <InvestmentUnit date="08/12/21" principal="17000" returned="12720" />
                            <InvestmentUnit date="08/12/21" principal="17000" returned="12720" />
                            <InvestmentUnit date="08/12/21" principal="17000" returned="12720" />

                        </div>



                    </div>
                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )}
        </>

    )
}



export default AllInvestment