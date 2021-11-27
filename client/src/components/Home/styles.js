import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    div: {
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    typography: {
        marginTop: '100px',
        marginLeft: '200px',
        color: '#3b54ad',
        fontFamily: ['"Montserrat"', 'Open Sans'].join(',')
    },
    image : {
        marginLeft: '150px',
    },
    image2 : {
        marginTop: '20px',
        align: 'center',
        height: '600px',
    }
}))