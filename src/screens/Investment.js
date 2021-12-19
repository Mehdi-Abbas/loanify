import React from 'react'
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/Investment'

const Investment = () => {
    const { height } = UseWindowDimensions();

    return (
        <div className="investmentContainer" style={{ height: height }}>
            <h1>My Investments</h1>
            <div className='investments'>
                <InvestmentUnit name="Ahmed Ali" />
                <InvestmentUnit name="Mohammad Saad" />
                <InvestmentUnit name="Bilal Khan" />
                <InvestmentUnit name="Ahsan Raza" />
                <InvestmentUnit name="Fawad Hassan" />
                <InvestmentUnit name="Aliza Sheikh" />
                
            </div>



        </div>
    )
}



export default Investment