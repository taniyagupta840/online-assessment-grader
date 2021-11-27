import { 
    Card, Button, Typography, CardContent, CardActions, Grid 
} from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import * as api from '../../api/index';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';

/**
* Component which shows list of assessments. It can dynamically change content
* depending on the type of user logged in. If its student, it will show options
* to review past assessments and attempt unattempted assessments. If its teacher,
* it will show list of assessments with list of students who have attempted it 
* and how much marks they scored.
*/
const ListAssessment = () => {
    /**
     * user - Stores the currently logged in user data and their role from the
     * local storage of the browser.
     */
    const user = useState(JSON.parse(localStorage.getItem('profile')));
    
    /**
     * @typedef {Array<Object>} assessmentList — Stores the array of assessments
     *  along with other key value pairs fetched from the server.
     */
    /**
     * @typedef {Function} setAssessmentList — Function for setting 'assessmentList'
     * boolean value.
     */
    const [assessmentList, setAssessmentList] = useState([]);
    
    const classes = useStyles();

    /** 
    * Sends an API request to the server after the webpage has finished 
    * rendering to fetch assessments from the database to attempt/review 
    * if current user is a student or to see students marks if current user 
    * is a teacher
    */
    useEffect( async () => {
        var subject = undefined;
        
        if (user[0].role === 'teacher') {
            subject = user[0].result.subject;
        }

        try {
            const { data } = await api.fetchAssessments(subject);
            setAssessmentList(data);  
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return (
        <div className={classes.mainContainer}>
            <Grid container spacing={2}>
            { assessmentList.map((assessmentData) => (
            <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" align="left">
                        {assessmentData.name}
                    </Typography>
                    <Typography variant="body2" align="left">
                        {assessmentData.subject}
                    </Typography>
                </CardContent>
            
                {/* Display marks of students in the assessment card if current user
                is a teacher. */}
                { user[0].role === 'teacher' && (
                    assessmentData.studentsAnswers.map((student) => (
                        <div className={classes.card2}>
                        <Typography align="center" variant="caption">
                        {student.studentName} scored {student.marks}
                        </Typography>
                        </div>
                    ))
                )}
            
            {/* Display option to attempt or to review students marks if the current
            user is a student. */}
            { user[0].role === 'student' && (
            <CardActions className={classes.cardActions}>
                { assessmentData.attempted &&
                <Typography align="left" variant="body2" gutterBottom>
                    Score: {assessmentData.marks}
                </Typography>
                }
                <Button size="small" color="primary" component={Link} 
                    to={`/attemptAssessment/${assessmentData._id}`}>
                    {assessmentData.attempted ? 'Review' : 'Attempt'}
                </Button>
            </CardActions>
            )}
            </Card>
            </Grid>)) }
            </Grid>
        </div>
    );
};

export default ListAssessment;