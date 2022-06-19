import React from 'react'
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import NumberFormat from 'react-number-format';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';

const InstallmentPaid = (props) => {
    const [date, setDate] = React.useState(props.date)
    const [amount, setAmount] = React.useState(props.amount)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeDate = (event) => {
        setDate(event.target.value)
    }
    const handleChangeAmount = (event) => {

        setAmount(event.target.value)
    }

    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        setDate(data.get('date'))
        setAmount(data.get('amount'))
        handleClose()
    }

    return (
        <div>
            {amount !== '0' ?
                <div className="paid-loans">
                    <span>{date}</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 'auto', alignItems: 'center' }}>
                        <span><p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={amount} /></p></span>
                        {/* <span className='icon'><EditIcon onClick={handleOpen} /></span> */}
                        {props.verified ? <VerifiedIcon style={{ fontSize:'2rem', color:'rgb(72 163 72)', backgroundColor:'#fff', borderRadius:'100%', marginLeft:'10px'}}/>:<span className='icon'><EditIcon onClick={handleOpen} /></span>}
                    </div>
                </div> :
                <div className="unpaid-loans">
                    <span>{date}</span>
                   <span><Button onClick={handleOpen} variant="contained">Paid</Button></span>

                </div>

            }
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="date"
                                    fullWidth
                                    id="date"
                                    label="Date"
                                    // autoFocus
                                    type="date"
                                    placeholder={date}
                                    onChange={handleChangeDate}
                                    value={date}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="amout"
                                    label="Paid Amount"
                                    name="amount"
                                    type="number"
                                    placeholder={amount}
                                    onChange={handleChangeAmount}
                                    value={amount}
                                />
                            </Grid>


                        </Grid>
                        {/* <div>*Payment will confirm after verification.</div> */}
                        <div style={{ width: '100%', textAlign: 'left', marginTop: '10px', fontSize: '0.8rem' }}>
                        *Payment will confirm after verification.
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', textAlign: 'center', marginTop: '30px' }}>
                            <Button variant="contained" type='submit'>
                                Confirm
                            </Button>
                            <Button variant="contained" type='submit'>
                                Cancel
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #fbdd44',
    boxShadow: 24,
    p: 4,
};
export default InstallmentPaid