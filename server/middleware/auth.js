import jwt from 'jsonwebtoken';

/**
 * Verifies the jwt token received in the header of the http request, so that
 * the user is authenticated.
 */
const auth = async (req, res, next) => {
    try {
        /**
         * Request header's key 'authorization' is accessed to get the jwt token.
         */
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        
        if (token) {
            /**
             * jwt token is verified using the same secret key used while signing
             * the token.
             */
            decodedData = jwt.verify(token, 'test');
            
            /**
             * On successful verification, we add new key to the http request
             * called 'userId' so that subsequent controllers can know who the
             * current user is, who is sending requests.
             */
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        console.log("error in middleware: " + error);
    }
}

export default auth;