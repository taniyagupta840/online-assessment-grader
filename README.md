# Online Assessment Grader

## Introduction

Using this submission tool, the faculty can roll out assessments and students can attempt those assessments. After submitting the answers, student's answers are evaluated and the assessment for that student is auto graded as per the marks set by the teacher.
Student can also review the answer key of already attempted assessments. Teachers can view the list of students who have been auto graded.

## Features

* **Create Assessment** - Teachers can create assessments with various parameters, like duration of test, marks per correct answer, negative marking.
* **Add Images** - Teachers can also add an image as a reference to each question.
* **Attempt Assessment** - Students can attempt the assessments given by the teachers.
* **Auto Submission after time out** - Assessment will be auto submitted when the time set by the teacher runs out.
* **Auto Grading (including Negative Marking)** - After attempting, the assessments are automatically graded by matching with the aswer key provided by the teacher. Marks are evaluated keeping in consideration all the parameters set by the teacher, like negative marking and marks per correct answer.
* **View Marks** - Students can view their marks and answer key immediately after they submit their answers for evaluation.
* **Review Attempted Assessment** - Students can review already attempted assessments where the original answers and the answers marked by the student are shown side by side.
* **Student's marks shown to Teacher** - Teachers dashboard will also show the list of students who have attempted the assessment along with their marks.

## Usage
* Download and install Node.js from [here](https://nodejs.org/en/download/)
* Clone this repository.
* Open terminal in working directory.
* Run following commands
```
cd client
npm install
npm start
```

* Open another terminal window in working directory.
* Run following commands
```
cd server
npm install
npm start
```

* Now both server and client sides should be up and running on localhost.

## Login Credentials

* Login for Teacher's IDs
1. email: demo_teacher1@example.com password: demo_teacher1
2. email: demo_teacher2@example.com password: demo_teacher2
* Login for Student's IDs
1. email: demo_student1@example.com password: demo_student1
2. email: demo_student2@example.com password: demo_student2
3. email: demo_student3@example.com password: demo_student3

* Database Connection URL is present in /server/.env

## Deployed Website Link
   https://online-assessment-grader.netlify.app/

## Screenshots

![Home Page](https://github.com/taniyagupta840/online-assessment-grader/blob/main/screenshots/app1.PNG)


![Login Page](https://github.com/taniyagupta840/online-assessment-grader/blob/main/screenshots/app2.PNG)
