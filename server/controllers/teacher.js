import jwt from 'jsonwebtoken';

import teacher from '../models/teacher.js';

/**
 * Controller for signing in teacher in the app. Generates jwt token to be
 * sent back to client on successful authentication.
 */
export const signIn = async (req, res) => {
    /**
     * email and password are found in the request body itself.
     */
    const { email, password } = req.body;
    
    try {
        /**
         * Existing user is searched based on the email received.
         */
        const existingUser  = await teacher.findOne({ email });
        if (!existingUser) 
            return res.status(404).json({ message: "User doesn't exist!"});
        
        /**
         * Password matching is done here.
         */
        const isPasswordCorrect = password === existingUser.password;
        if (!isPasswordCorrect) 
            return res.status(400).json({ message: "Invalid Credentials." });
        
        /**
         * A jwt token is being signed here with expiry time 'infinite' and 
         * secret key set as 'test'.
         */
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id }, 'test'
        );

        /**
         * Existing user details, role and the signed token is sent back to the
         * client.
         */
        res.status(200).json({ result: existingUser, role: 'teacher', token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}