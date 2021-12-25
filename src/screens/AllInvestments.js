import React from 'react'
import UseWindowDimensions from '../components/Screensize';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/InvestmentDetail'
import NumberFormat from 'react-number-format';

const AllInvestment = () => {
    const { height } = UseWindowDimensions();

    return (
        <div className="investmentContainer" style={{ height: height }}>
            <h1>All Loans</h1>
            <div className='investments'>
                <div className="summary">
                    <div className="row">
                        <h5>Total amount <br/>invested:</h5>
                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={23678100} /></p>
                    </div>
                    <div className="row">
                        <h5>Total amount <br/>returned:</h5>
                        <p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={236100} /></p>
                    </div>
                </div>
                <InvestmentUnit date="08/12/21" principal="17000" returned="12036"/>
                <InvestmentUnit date="08/12/21" principal="875869" returned="12720" />
                <InvestmentUnit date="08/12/21" principal="175800" returned="12720" />
                <InvestmentUnit date="08/12/21" principal="17000" returned="12720" />
                <InvestmentUnit date="08/12/21" principal="17000" returned="12720" />
                <InvestmentUnit date="08/12/21" principal="17000" returned="12720" />
                
            </div>



        </div>
    )
}



export default AllInvestment