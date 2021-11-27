import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        maxWidth: "850px",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    div: {
        marginTop: '10px'
    }
}))