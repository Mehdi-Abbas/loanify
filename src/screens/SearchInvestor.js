import React, { useState, useEffect } from "react";
import UseWindowDimensions from '../components/Screensize';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom'
import InvestmentUnit from '../components/Investment'
import Titlebar from '../components/Titlebar';
import { Tab, Tabs } from '@mui/material';
// import { TabPanel } from '@mui/lab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import LoanRequest from '../components/LoanRequest';
import Invester from '../components/Invester';
import VerifiedBorrower from '../components/VerifiedBorrower';
import Searchbar from '../components/searchbar';
import TextField from '@mui/material/TextField';
import Login from "./Login"
import Autocomplete from '@mui/material/Autocomplete';
import fire from '../helpers/db';
// import PropTypes from 'prop-types';



const Investment = () => {
    const { height, width } = UseWindowDimensions();
    const [validUser, setValidUser] = useState(false);
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    // let { url } = useRouteMatch();
    // console.log(url)
    const userState = () => {
        const userEmail = localStorage.getItem('user');
        const userRole = localStorage.getItem('role');

        setValidUser(userEmail && userRole && userRole === 'borrower')

        fire.database().ref('user').once('value').then((data) => {
            var temp=[]
            data.forEach(child => {
                if(child.val().role === "lender" && child.val().interest)
                    temp.push({...child.val(), _key:child.key})
            });
            setAPIData(temp)

        }).catch(function (error) {
            console.log(error);
        });
    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return ([item.name]).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    useEffect(() => {
        userState();
    }, []);
    return (
        <>
            {validUser ? (
                <>
                    <div style={{ minHeight: height, width: width }}>
                        <Titlebar title="Search Investors" backlink="/dashboardborrower" />
                        <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Autocomplete
                                freeSolo
                                fullWidth
                                onInputChange={(e) => searchItems(e.target.value)}
                                sx={{ marginRight: 5, marginLeft: 5 }}
                                id="free-solo-2-demo"
                                disableClearable
                                options={[]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="investmentContainer" style={{ width: width }}>

                            <div className='investments'>
                                {APIData.length > 0 ? 
                                searchInput.length > 1 ? (
                                    filteredResults.map((item, key) => {
                                        return (
                                            <Invester key={key} _key={item._key} name={item.name && item.name} interest={item.interest && item.interest}/>
                                        )
                                    })
                                ) : (
                                    APIData.map((item, key) => {
                                        return (
                                            <Invester key={key} _key={item._key} name={item.name && item.name} interest={item.interest && item.interest}/>
                                        )
                                    })
                                ):"No investor found"}

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



export default Investment