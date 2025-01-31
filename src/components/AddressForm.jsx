import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { updateAddress } from '../features/checkout-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function AddressForm() {
const address = useSelector((state)=> state.checkout?.address);
const dispatch = useDispatch();
function handleChange(event){
    const {name, value} = event.target ?? {};
    dispatch(updateAddress({[name]:value}));
}
  return (  
    <>
 <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <Box component="form" onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required id='firstName'
              name='firstName'
              label='First Name'
              fullWidth
              autoComplete='given-name'
              variant='standard' 
              defaultValue={address.firstName??""}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required id='lastName'
              name='lastName'
              label='Last Name'
              fullWidth
              autoComplete='family-name'
              variant='standard' 
              defaultValue={address.lastName??""}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='address1'
              name='address'
              label='Address1'
              fullWidth
              autoComplete='shiping address-line1'
              variant='standard' 
              defaultValue={address.address ??""}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='address2'
              name='address'
              label='Address2'
              fullWidth
              autoComplete='shiping address-line2'
              variant='standard' 
              defaultValue={address.address??""}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='zipCode'
              name='zipCode'
              label='Zip Code'
              fullWidth
              variant='standard'
              defaultValue={address.zipCode??""}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              variant='standard' 
              defaultValue={address.country??""}
              />
          </Grid>
        </Grid>
      </Box></>
  
  );
}
