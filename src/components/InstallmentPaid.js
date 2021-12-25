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
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 'auto' }}>
                        <span><p><NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'PKR '} value={amount} /></p></span>
                        <span className='icon'><EditIcon onClick={handleOpen} /></span>
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="date"
                                    required
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
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '30px' }}>
                            <Button variant="contained" type='submit'>
                                Confirm
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
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default InstallmentPaid