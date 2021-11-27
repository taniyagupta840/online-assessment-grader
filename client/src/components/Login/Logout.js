import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router";

/**
* Component created just to logout the user. Doesn't display anything.
*/
export default function Logout() {
    const navigate = useNavigate();

    /**
     * Function runs when page has finished loading, it logs out the user, i.e
     * clears the local storage and then navigates to the home page.
     */
    useEffect(() => {
        localStorage.clear();
        navigate('/');
    });
    return (<Grid></Grid>);
}