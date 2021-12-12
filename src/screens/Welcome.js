import React from 'react'
import Container from '@mui/material/Container';
import UseWindowDimensions from '../components/Screensize';


const Welcome = () => {
    const { height } = UseWindowDimensions();
    return (
        <div style={{ display: 'flex', height: height, flexDirection: "column", alignItems: 'center',justifyContent:'center' }}>
            <Container component="main" maxWidth="xs">
                <img src="loanify-logo.jpeg" alt="Loanify logo" id='logo'/>
            </Container>
            
        </div>
    )
}

export default Welcome