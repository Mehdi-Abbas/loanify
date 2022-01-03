import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '10px',
                border: '2px solid #a99f9f'

            }}>
                <SearchIcon style={{ margin: 'auto 10px' }} />
                <input style={{ border: 'none', outline: 'none', fontSize: '1rem', height: '30px', width: '100%' }} placeholder='Search invester...' />

            </div>
        </div>

    )
}

export default Searchbar
