import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles.js';

/**
* This component acts a navigation bar throughout the entire web app.
*/
function Navbar() {
    /**
     * @typedef {Object} user — Object for storing data of user currently logged in.
     */
    /**
     * @typedef {Function} setUser — Function for setting user data in the 'user'
     * object.
     */
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    // 'location' variable keeps track of the current route being 
    // accessed by the browser.
    const location = useLocation();

    const classes = useStyles();

    // Updates the user state variable from the local storage whenever the 
    // route is changed by the browser.
    useEffect(() => {
        return () => {
            setUser(JSON.parse(localStorage.getItem('profile')));
        }
    }, [location]);

    /**
     * @type {Array<string>} links - Stores the links to be shown in the 
     * navigation bar.
     */
    var links = [];
    /**
     * @type {Array<string>} labels - Stores the text labels to be shown in the 
     * navigation bar.
     */
    var labels = [];

    /** 
    * Value of labels and links is changed according to the type of user
    * which is currently logged in.
    */ 
    if (user === null) {
        links = ['/login'];
        labels = ['Login'];
    } else if (user.role === 'teacher') {
        links = ['/', '/viewAssessments', '/newAssessment', '/logout'];
        labels = ['Home', 'Student Marks', 'Create Assessment', 'Logout'];
    } else if (user.role === 'student') {
        links = ['/', '/viewAssessments', '/logout'];
        labels = ['Home', 'Assessments', 'Logout'];
    }

    return (
        <AppBar className={classes.container} position="static">
            <Toolbar>
                <Typography variant="h4" color="inherit">
                    Online Assessment Grader
                </Typography>

                {/* 'links' and 'labels' variables are mapped to buttons here */}
                <section className={classes.rightToolbar}>
                { links.map((link, index) => (
                    <Button className={classes.button} 
                            component={Link} to={link}
                            size="large"
                            color="inherit">
                            { labels[index] }
                    </Button>
                )) }
                </section>
            </Toolbar>
        </AppBar>
      );
};

export default Navbar