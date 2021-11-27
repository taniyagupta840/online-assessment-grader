import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import studentRoutes from './routes/student.js';
import teacherRoutes from './routes/teacher.js';
import assessmentRoutes from './routes/assessment.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());

/**
 * Necessary routes have been added as middleware here.
 */
app.use('/assessments', assessmentRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

app.get('/', (req, res) => {
        res.send("Hello and Welcome to this Project.");
})

/**
 * PORT number required to connect to the database.
 */
const PORT = process.env.PORT || 5000;

/**
 * Connecting to the database using the specified Connection URL and PORT.
 * Connection URL is stored in an .env file
 */
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true})
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log("error connecting to db: " + error.message));