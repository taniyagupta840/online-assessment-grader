import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router';

import QuestionForm from '../QuestionForm/questionForm';
import Assessment from '../Assessment/Assessment';
import * as api from '../../api/index';
import useStyles from './styles.js';

/**
* Assessment form where teacher enters assessment's details to create a new
* assessment for the students to attempt.
*/
const Form = () => {
    /**
     * Stores the currently logged in teacher's data from the local 
     * storage of the browser.
     */
    const teacher = useState(JSON.parse(localStorage.getItem('profile')));

    /**
     * @typedef {Object} assessmentData — Stores the data of assessment
     *  currently being created by the teacher.
     */
    /**
     * @typedef {Function} setAssessmentData — Function for setting 'assessmentData'
     * object value.
     */
    const [assessmentData, setAssessmentData] = useState({
        subject: teacher[0].result.subject, name: 'Untitled Assessment', 
        timer: 5, questions: [], correctMark: 0, negativeMark: 0, answers: []
    });

    const navigate = useNavigate();
    const classes = useStyles();

    /**
    * Submits the assessment to be created to the server so that it can be stored
    * in the database and redirects to home page on successful creation.
    */
    const handleSubmit = async (e) => {
        try {
            await api.createAssessment(assessmentData);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid container xs={8} direction="column">
                <Assessment display={true} 
                dataGlobal={{assessment: assessmentData,
                attempted: true, marks: undefined}} />
            </Grid>
            
            <Grid className={classes.paper} container xs={4} spacing={3} direction="row">
                <Grid item>
                    <TextField
                        name="name"
                        required
                        type="String"
                        label="Name of Assessment"
                        size="small"
                        variant="outlined"
                        value={assessmentData.name}
                        onChange={(e) => setAssessmentData({ 
                            ...assessmentData, 
                            name: e.target.value
                        })}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="correctMark"
                        required
                        type="number"
                        label="Marks per Correct Answer"
                        size="small"
                        variant="outlined"
                        value={assessmentData.correctMark}
                        onChange={(e) => setAssessmentData({ 
                            ...assessmentData, 
                            correctMark: e.target.value
                        })}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="negativeMark"
                        required
                        type="number"
                        variant="outlined" 
                        size="small"
                        label="Negative Marks"
                        value={assessmentData.negativeMark}
                        onChange={(e) => setAssessmentData({ 
                            ...assessmentData, 
                            negativeMark: e.target.value
                        })}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="timer"
                        required
                        type="Number"
                        size="small"
                        label="Time (in minutes)"
                        variant="outlined" 
                        value={assessmentData.timer}
                        onChange={(e) => setAssessmentData({ 
                            ...assessmentData, 
                            timer: e.target.value
                        })}
                    />
                </Grid>
                <Grid item>
                    {/* Question form component is used here to add questions to the
                    assessment currently being created. */}
                    <QuestionForm assessmentData={assessmentData} 
                        setAssessmentData={setAssessmentData}/>
                </Grid>
                <Grid item>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary" 
                        size="large">
                        Submit Assessment
                    </Button>
                </Grid>
                
            </Grid>
        </Grid>
    );
};

export default Form;