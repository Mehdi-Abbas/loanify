import React from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import NumberFormat from 'react-number-format';

const InvestmentDetail = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className="All-loons">
            <Link to='/dashboardlender/investment/allinvestments/investmentdetail'>
                <div>
                    <span><h5>Date</h5> <p>{props.date}</p></span>
                    <span><h5>Amount </h5><p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.principal} /></p></span>
                    <span><h5>Amount Repaid </h5><p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={props.returned} /></p></span>
                </div>
            </Link>
            
        </div>
    )
}


export default InvestmentDetail