import React from 'react'
import UseWindowDimensions from '../components/Screensize';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/InvestmentDetail'
import NumberFormat from 'react-number-format';
import Titlebar from '../components/Titlebar';
import { border } from '@mui/system';


const InvestmentHistory = () => {
    const { height } = UseWindowDimensions();

    return (
        <div className="investmentContainer" style={{ minHeight: height }}>
            <Titlebar title="Investment History" backlink="/dashboardlender" />
            <div className='investments'>
                <div className="summaryprofit">
                    <div>
                        <div className="row">
                            <h5>Total Amount Invested</h5>
                            <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={230000} /></p>
                        </div>
                        <div className="row">
                            <h5>Total Amount Returned</h5>
                            <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={280000} /></p>
                        </div>
                    </div>
                    
                    <div className='Profit'>
                        <div>Profit</div>
                        <div className="num">+21.7%</div>
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
    )
}



export default InvestmentHistory