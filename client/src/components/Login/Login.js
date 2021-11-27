import React, { useState } from 'react'
import { 
    Avatar, Button, Paper, Grid, 
    Typography, Container, InputLabel, 
    Select, MenuItem, FormControl 
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useNavigate } from 'react-router';

import useStyles from './styles.js';
import Input from'./input.js';
import * as api from '../../api/index.js';

const initialState = { email: '', password: '', role: '' };

/**
* Component which acts as login form in the web app.
*/
const Login = () => {
    /**
     * @typedef {Boolean} showPassword — Boolean for storing whether password has
     * to be displayed or not.
     */
    /**
     * @typedef {Function} setShowPassword — Function for setting 'showPassword'
     * boolean value.
     */
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const classes = useStyles();
    const navigate = useNavigate();

    /**
    * Function for logging in the user, sends API request to server depending on
    * the role of user who is logging in. Also sets the result in the local
    * storage of browser upon successful login.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.role === 'student') {
                const { data } = await api.signInStudent(formData);
                localStorage.setItem('profile', JSON.stringify({ ...data }));
            }
            else if (formData.role === 'teacher') {
                const { data } = await api.signInTeacher(formData);
                localStorage.setItem('profile', JSON.stringify({ ...data }));
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    /**
    * Function for changing form data in the state variables as it changes in
    * the input fields.
    */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    /**
    * Function for setting state whether password has to be shown or not.
    */
    const handleShowPassword = () => 
        setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input 
                            name="email" 
                            label="Email Address" 
                            handleChange={handleChange} 
                            type="email"/>
                        <Input 
                            name="password" 
                            label="Password" 
                            handleChange={handleChange} 
                            type={showPassword ? "text" : "password"} 
                            handleShowPassword={handleShowPassword} />
                    
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                            name="role"
                            label="Role"
                            onChange={handleChange}>
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                    
                    </Grid>
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        className={classes.submit}>
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Login