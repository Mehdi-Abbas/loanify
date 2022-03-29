import React, { useState, useEffect } from 'react'
import UseWindowDimensions from '../components/Screensize';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/InvestmentDetail'
import NumberFormat from 'react-number-format';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InstallmentPaid from '../components/InstallmentPaid';
import Titlebar from '../components/Titlebar';
import Login from './Login';
const LoanDetail = () => {
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
                        <Titlebar title="Installment Details" backlink="/dashboardlender/investment/allinvestments" />
                        <div className='investments'>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h4" component="h2">
                                    12/08/21
                                </Typography><br />
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Borrower</h4>
                                        <p>Ahmed Ali</p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Principal</h4>
                                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={76545} /></p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Tenure</h4>
                                        <p>5 Months</p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Interest</h4>
                                        <p>18%</p>
                                    </div>
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Monthly Installment</h4>
                                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={4012} /></p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Payment Mode</h4>
                                        <p>Bank Transfer</p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Total Installments</h4>
                                        <p>5</p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Installment Paid</h4>
                                        <p>2</p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Installment Remaining</h4>
                                        <p>3</p>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="detail">
                                        <h4>Amount Returned</h4>
                                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={87908} /></p>
                                    </div>
                                </Typography>

                                <br /><br />


                            </Box>
                            <div>
                                <InstallmentPaid date="2021-01-01" amount="4500" verified='true' />
                                <InstallmentPaid date="2021-02-01" amount="4500" />
                                <InstallmentPaid date="2021-03-01" amount="0" />
                                <InstallmentPaid date="2021-04-01" amount="0" />
                                <InstallmentPaid date="2021-05-01" amount="0" />
                                <InstallmentPaid date="2021-06-01" amount="0" />
                            </div>
                        </div>




                    </div>
                </>
            ) : (
                <Login signin={(isValidUser) => setValidUser(isValidUser)} />
            )}
        </>

    )
}

const style = {
    margin: '20px 0px',
    border: '2px solid #fbdd44',
    backgroundColor: '#fbdd4433',
    borderRadius: '10px',
    padding: '10px'
};

export default LoanDetail