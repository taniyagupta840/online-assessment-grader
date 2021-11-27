import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

/**
* This component acts as a special input field in the login form.
* @param {string} name - name prop of TextField.
* @param {Function} handleChange - It changes the value of login form according 
* to value changed in TextField.
* @param {string} label - label prop of TextField.
* @param {Boolean} half- makes TextField responsive.
* @param {Boolean} autoFocus - autoFocus prop of TextField.
* @param {string} type - type prop of TextField.
* @param {Function} handleShowPassword - Function to change state which decides
* whether to show or password or not.
*/
const input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange} 
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={
                name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                { type === 'password' ? <Visibility /> : <VisibilityOff /> }
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null
            } />
        </Grid>
    )
}

export default input
