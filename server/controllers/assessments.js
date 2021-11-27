import AssessmentModel from '../models/assessments.js';
import SubjectModel from '../models/subjects.js';
import TeacherModel from '../models/teacher.js';

/**
 * Controller to find the requested assessment from the database and includes it
 * in the body of response along with some other key value pairs like 'attempted'
 * boolean value which tells whether it has been attempted by the current user
 * or not, 'answers' array which stores the answers of the user to the given
 * assessment if he has attempted it in the past.
 */
export const getAssessment = async (req, res) => {
    try {
        /**
         * @typedef assessmentID - Extracts the URL parameter to get the 
         * assessment ID which is to be fetched. 
         * */
        const { assessmentID } = req.params;
        
        /**
         * Stores the assessment data if it is found in the database.
         */
        var assessment = await AssessmentModel.findById(assessmentID);

        /**
         * All the subjects details.
         */
        const subjects = await SubjectModel.find();
        
        /**
         * Boolean flag to determine whether the requested assessment has been
         * found or not
         */
        var found = false;
        
        /**
         * Boolean flag to check whether the current user has attempted the 
         * assessment or not.
         */
        var attempted = false;
        
        /**
         * Answers given by the user for current assessment if the user has
         * attempted the assessment in the past.
         */
        var answers = [];

        /**
         * Assessment is searched through 'subjects' collections, if found, then
         * also checked for whether it has been attempted by the current user
         * to include his answers in the response.
         */
        for (var i in subjects) {
            for (var j in subjects[i].assessments) {
                if (subjects[i].assessments[j].assessmentID == assessmentID) {
                    for (var k in subjects[i].assessments[j].studentsAnswers) {   
                        if (subjects[i].assessments[j].studentsAnswers[k].studentID 
                            === req.userId) {
                            attempted = true;
                            answers = subjects[i].assessments[j].studentsAnswers[k].answers;
                            found = true;
                            break;
                        }
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        
        res.status(200).json({ assessment, attempted, answers });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

/**
 * Controller to fetch all the assessments of a particular subject or all the 
 * assessments of all the subjects from the database (depending on the role of
 * current user).
 */
export const getAssessments = async (req, res) => {
    try {
        /**
         * @typedef subject - subject name is extracted from the URL parameters.
         */
        const { subject } = req.params;

        /**
         * All the subjects collections.
         */
        const subjects = await SubjectModel.find();

        /**
         * Details of that particular teacher who is currently requesting the 
         * assessments list. If this variable is null then that means current
         * user is not a teacher, but a student.
         */
        const teacher = await TeacherModel.findById(req.userId);
        
        var assessments = [];

        /**
         * Incase the current user is a teacher, all the subjects collections 
         * are gone through and for that particular subject, all the assessments
         * are pushed in the output array 'assessments'.
         * If current user is not a teacher, that means its a student, then we
         * push all the assessments of all the subjects to the output array. 
         * For each assessment, 'attempted' boolean and 'answers' array is also
         * there which represent whether the student has attempted the 
         * assessment or not, if yes then 'answers' array include the answers 
         * given by the student for that particular assessment.
         */
        for (var i in subjects) {
            for (var j in subjects[i].assessments) {
                if (subjects[i].name === subject && teacher) {
                    assessments.push({
                        name: subjects[i].assessments[j].assessmentName,
                        _id: subjects[i].assessments[j].assessmentID,
                        subject: subjects[i].name,
                        studentsAnswers: subjects[i].assessments[j].studentsAnswers
                    });
                }
                else if (!teacher) {
                    var attempted = false;
                    var marks = undefined;

                    for (var k in subjects[i].assessments[j].studentsAnswers) {
                        if (subjects[i].assessments[j].studentsAnswers[k].studentID
                             === req.userId) {
                            attempted = true;
                            marks = subjects[i].assessments[j].studentsAnswers[k].marks;
                        }
                    }
                    assessments.push({
                        name: subjects[i].assessments[j].assessmentName,
                        _id: subjects[i].assessments[j].assessmentID,
                        subject: subjects[i].name,
                        attempted,
                        marks
                    });
                }
            }
        }
        res.status(200).json(assessments);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: error.message});
    }
};

/**
 * Controller to add a new assessment to the database corresponding to the subject
 * of the current teacher.
 */
export const createAssessment = async (req, res) => {
    /**
     * assessment data is taken from the body of the request.
     */
    const assessment = req.body;

    /**
     * If somehow empty form is received, then it is ignored.
     */
    if (assessment.questions.length === 0) {
        res.status(400).json({message: "Empty Assessment"});
        return;
    }

    /**
     * Details of the subject to which the assessment belongs.
     */
    var subject = await SubjectModel.findOne({ name: assessment.subject });

    const newAssessment = new AssessmentModel({ ...assessment});

    if (subject.assessments)
        subject.assessments.push({ 
            assessmentID: newAssessment._id, 
            assessmentName: assessment.name, 
            answerKey: assessment.answerKey 
        });
    else subject.assessments = [{ 
        assessmentID: newAssessment._id, 
        assessmentName: assessment.name, 
        answerKey: assessment.answerKey 
        }];
    
    const updatedSubject = await 
        SubjectModel.findByIdAndUpdate(subject._id, subject, { new: true });

    /**
     * New Assessment is pushed to both the collections, subjects and assessments.
     * assessments collection store all the details of the assessment whereas
     * subjects collection store only brief information of the assessment, along
     * with the answers of the students who have attempted it.
     */
    try {
        await newAssessment.save();
        await updatedSubject.save();
        res.status(200).json(newAssessment);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * Calculates the marks scored by the student in a particular assessment given
 * its answer key, marks per correct answer and the negative marking in the
 * assessment.
 * @param {Array<string>} answerKey 
 * @param {Array<string>} answers 
 * @param {number} correctMark 
 * @param {number} negativeMark 
 * @returns marks scored by the student
 */
const evaluateMarks = (answerKey, answers, correctMark, negativeMark) => {
    var marks = 0;
    
    for (var i in answers) {
        if (answers[i] === answerKey[i]) {
            marks += correctMark;
        } else if (!answers[i]) {
            continue;
        } else {
            marks += negativeMark;
        }
    }

    return marks;
}

/**
 * Controller to store the answers given by the student for a particular
 * assessment.
 */
export const attemptAssessment = async (req, res) => {
    /**
     * @typedef studentID - ID of the student attempting the assessment.
     * @typedef studentName - name of the student attempting the assessment.
     * @typedef answers - array of answers given by the student.
     */
    const { studentID, studentName, answers }= req.body;
    
    /**
     * @typedef assessmentID - it is received from the URL parameters.
     */
    const { assessmentID } = req.params;

    /**
     * assessment is searched in the subjects collections and when its found,
     * its answer key, and student's answers are sent for calculating marks of
     * student. Finally the marks and answers are pushed in the subjects collection
     * itself under that particular assessment. Also adds marks of the student 
     * in the response body.
     */
    try {
        const assessment = await AssessmentModel.findById(assessmentID);
        var subject = await SubjectModel.findOne({ name: assessment.subject });
        var marks = 0;
        for (var i in subject.assessments) {
            if (subject.assessments[i].assessmentID == assessmentID) {
                marks = evaluateMarks(subject.assessments[i].answerKey, answers,
                    assessment.correctMark, assessment.negativeMark);
                
                const studentAnswer = { studentID, studentName, answers, marks };
                
                if (subject.assessments[i].studentsAnswers.length > 0)
                    subject.assessments[i].studentsAnswers.push(studentAnswer);
                else subject.assessments[i].studentsAnswers = [ studentAnswer ];
            }
        }

        try {
            await SubjectModel.findByIdAndUpdate(subject._id, subject, 
                                                { new: true });
            res.status(200).json(marks);
        } catch (error) {
            console.log(error.message);
        }
    } catch (error) {
        console.log(error.message);
    }
}