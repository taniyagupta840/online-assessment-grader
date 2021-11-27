import React, { useState, useEffect } from 'react';
import { 
    Button, Grid, FormControl, InputLabel, 
    Typography, Select, MenuItem, Paper 
} from '@material-ui/core';
import { useParams, useNavigate } from 'react-router';
import Countdown from 'react-countdown';

import * as api from '../../api/index';
import useStyles from './styles.js';

/**
* This component is used to display assessments in various places like while 
* attempting the assessment, reviewing attempted assessment, or generally 
* displaying while teacher is creating assessment.
* @param {Boolean} display - This boolean value decides that whether assessment
* component is being used for generally displaying assessment (display=true) 
* to teacher or is it being attempted or reviewed (display=false) by the student.
* @param {Object} dataGlobal - This object is used if 'display' is true. It
* serves the purpose of updating the displayed assessment with newly entered form
* data.
*/
const Assessment = ({ display=false, dataGlobal }) => {
    // Extracts the assessmentID url parameter.
    const { assessmentID } = useParams();

    /**
     * Stores the currently logged in user data and their role from the
     * local storage of the browser.
     */
    const student = useState(JSON.parse(localStorage.getItem('profile')));
    
    const navigate = useNavigate();
    const classes = useStyles();
    
    /**
     * This function submits the attempted assignment when user clicks on submit
     * button or when the countdown is complete.
     */
    const handleSubmit = async (e) => {
        try {
            await api.attemptAssessment(
                student[0].result._id, 
                student[0].result.name,
                answers,
                assessmentID);
            navigate('/viewAssessments');
        } catch (error) {
            console.log(error.message);
        }
    };
    
    /**
     * @typedef {Object} assessmentData — Stores the assessment data to be 
     * displayed.
     */
    /**
     * @typedef {Function} setAssessmentData — Function for setting 'assessmentData'
     * object value.
     */
    const [assessmentData, setAssessmentData] = useState(dataGlobal);
    
    /**
     * Stores the answers given by the students while attempting the assessment.
     */
    var answers = [];

    /** 
    * Sends an API request to the server after the webpage has finished 
    * rendering to fetch assessment data from the server for a particular assessmentID
    * if the user is a student, or to update the components with new prop data
    * i.e 'dataGlobal' if the user is a teacher (display=true).
    */
    useEffect(async () => {
        if (!display) {
            const { data } = await api.fetchAssessment(assessmentID);
            setAssessmentData(data);
            answers = Array(data.assessment.questions.length).fill('');
        } else {
            setAssessmentData(dataGlobal);
        }
    }, [dataGlobal]);

    return (
        <Paper className={classes.paper} align="center" >
        { assessmentData && assessmentData.assessment && 
        <Grid container spacing={2} direction="column">
            <Grid container direction="column">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            {assessmentData.assessment.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            Marks per Correct Answer
                            : {assessmentData.assessment.correctMark
                        }</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            Negative Marking 
                            : {assessmentData.assessment.negativeMark}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            Subject : {assessmentData.assessment.subject}
                        </Typography>
                    </Grid>
                    { !assessmentData.attempted &&
                    <Grid item xs={12}>
                        <Typography>
                            <b> Time Left : </b>
                        </Typography>
                        <Countdown 
                            date={Date.now() + assessmentData.assessment.timer*60*1000} 
                            onComplete={handleSubmit}
                            />
                    </Grid>
                    }
                    {/* Questions are mapped to components here */}
                    { assessmentData.assessment && 
                      assessmentData.assessment.questions && 
                      assessmentData.assessment.questions.map((question, index) => (
                    <Grid item container>
                        <Grid item>
                            <Typography align="left" variant="h6">
                                Q{index+1}. {question.question}
                            </Typography>
                        </Grid>
                        { question.selectedFile &&
                        <Grid item xs={12}>
                            <img src={question.selectedFile} align="left"/>
                        </Grid>
                        }
                        { question.options.map((option, index) => (
                            <Grid container>
                            <Typography align="left">{index+1}. {option}</Typography>
                            </Grid>
                        )) }

                        {/* Answer Key is displayed along with the questions if the
                        student has already attempted the assessment and is here
                        to review the assessment. */}
                        { !display && 
                        (assessmentData.attempted ? (
                        <div>
                            <Typography align="left">
                                <b>Correct Answer</b>
                                : {assessmentData.assessment.answerKey[index]}
                            </Typography>
                            <Typography align="left">
                                <b>Your Answer</b>
                                : {assessmentData.answers[index]}
                            </Typography>
                        </div>
                        ) : (
                        <Grid item container xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Answer</InputLabel>
                                <Select
                                    name="answer"
                                    label="Answer"
                                    required
                                    onChange={(e) => 
                                        { answers[index] = e.target.value; }}>
                                    { question.options.map((option) => 
                                    <MenuItem value={option}>{option}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>)) }
                    </Grid>)) }
                </Grid>
            </Grid>
            {/* Submit button is displayed if the user is not here to review the
            assessment or the assessment is not just being displayed to the teacher,
            but is being attempted by the student. */}
            { !display && !assessmentData.attempted && 
            <Grid item>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    color="primary" 
                    size="large">
                    Submit Answers
                </Button>
            </Grid>
            }
        </Grid> }
        </Paper>
    );
};

export default Assessment;