import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import logo from '../../submission.png';
import wordcloud from '../../wordcloud.png';
import useStyles from './styles.js';

/**
* Component which is displayed on the home page of the website.
*/
const Home = () => {
    const classes = useStyles();
    
    /**
     * Stores the currently logged in user data and their role from the
     * local storage of the browser.
     */
    const user = useState(JSON.parse(localStorage.getItem('profile')));
    
    var displayString = '';
    
    /**
     * 'displayString' is changed according to the role of the user which is 
     * currently logged in the website.
     */
    if (user[0] && user[0].role === 'teacher') {
        displayString = 'Hello Teacher !';
    } else if (user[0] && user[0].role === 'student') {
        displayString = 'Hello Student !';
    }

    return (
        <Grid container>
            <Grid item xs={5}>
                {/* displayString is displayed on the webpage to give appropriate
                message to the user */}
                <Typography className={classes.typography} variant={"h3"}>
                    <b>{ displayString }</b>
                </Typography>
                <img src={logo} alt="Hello" className={classes.image}/>
            </Grid>
            <Grid item xs={7}>
                <img src={wordcloud} alt="Hello" className={classes.image2}/>
            </Grid>
        </Grid>
    );
};

export default Home;