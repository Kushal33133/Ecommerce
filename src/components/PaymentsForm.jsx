import { TextField, Typography, Box } from '@mui/material'
import {Grid} from '@mui/material'
import React from 'react'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updatePayment } from '../features/checkout-slice'

export default function PaymentsForm() {
    
    const payment = useSelector((state)=> state.checkout?.payment);
    const dispatch = useDispatch();
    function handleChange(event){
        const {name, value} = event.target ?? {};
        dispatch(updatePayment({[name]:value}));
    }
  return (
   <>
   <Typography variant='h6' gutterBottom>
   Payment Method
   </Typography>
   <Box component="form" onChange={handleChange}>
   <Grid container spacing={3}>
   <Grid item xs={12} md={6}> 
   <TextField variant='standard' 
   required 
   name='name'
   id="name"
   label="Name on card"
   fullWidth
   autoComplete='cc-name'
   defaultValue={payment?.name??""}
   />
   </Grid>
   <Grid item xs={12} md={6}> 
   <TextField variant='standard' 
   required 
   name='cardNumber'
   id="cardNumber"
   label="Card Number"
   fullWidth
   autoComplete='cc-number'
   defaultValue={payment?.cardNumber??""}
   />
   </Grid>
   <Grid item xs={12} md={6}> 
   <TextField 
   variant='standard' 
   required 
   name='expDate'
   id="expDate"
   label="Expiry Date"
   fullWidth
   autoComplete='cc-exp'
   defaultValue={payment?.expDate??""}
   />
   </Grid>
   <Grid item xs={12} md={6}> 
   <TextField 
   variant='standard' 
   required 
   name='cvv'
   id="cvv"
   type="password"
   label="CVV"
   fullWidth
   autoComplete='cc-csc'
   defaultValue={payment?.cvv??""}
   />
   </Grid>
   </Grid>
   </Box>
   </>
  )
}
