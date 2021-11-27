import  axios from 'axios';

/**
 * To handle all the requests to the server.
 */
const API = axios.create({ baseURL: 'http://localhost:5000/' });

/**
 * Interceptor has been added here to include the jwt token in the header of every
 * HTTP request so that server can verify the logged in user and return 
 * necessary response.
 */
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearers ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

/**
 * Sends a get request to the server on the specified route to get back the 
 * assessment data.
 * @param {string} assessmentID - ID of the assessment to be fetched from the DB.
 * @returns assessment data requested.
 */
export const fetchAssessment = (assessmentID) => API.get(`/assessments/ID/${assessmentID}`);

/**
 * Sends a get request to the server to get back all the assessments under a 
 * particular subject.
 * @param {string} subject - Name of the subject whose assessments have to be
 * fetched from the DB.
 * @returns all the assessment under the specified subject.
 */
export const fetchAssessments = (subject) => API.get(`/assessments/${subject}`);

/**
 * Sends a post request to the server to submit the answers
 * of the assessment attempted by a particular student.
 * @param {string} studentID - ID of the student attempting the assessment.
 * @param {string} studentName - name of the student attempting the assessment.
 * @param {Array<string>} answers - array of answers given for the particular
 * assessment.
 * @param {string} assessmentID - ID of the assessment which has been attempted.
 */
export const attemptAssessment = (studentID, studentName, answers, assessmentID) => 
    API.post(`/assessments/${assessmentID}`, {studentID, studentName, answers});

/**
 * Sends a post request to the server with assessment data as its body to create
 * a new assessment.
 * @param {Object} assessment - Contains the assessment data to be sent to server. 
 */
export const createAssessment = (assessment) => API.post('/assessments/', assessment);

/**
 * Sends a post request with login details of student to get back a jwt token for 
 * authentication
 * @param {Object} formData - contains the email and password.
 * @returns user details, role, and jwt token to be stored in the local storage.
 */
export const signInStudent = (formData) => API.post('/student/signin', formData);

/**
 * Sends a post request with login details of teacher to get back a jwt token for 
 * authentication
 * @param {Object} formData - contains the email and password.
 * @returns user details, role, and jwt token to be stored in the local storage.
 */
export const signInTeacher = (formData) => API.post('/teacher/signin', formData);