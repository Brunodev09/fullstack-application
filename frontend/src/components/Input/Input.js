import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';


const CustomInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #1bd75f',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#1bd75f',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
        },
        '&:before': {
            borderColor: '#1bd75f',
            color: '#1bd75f'

        },
        '&:after': {
            borderColor: '#1bd75f',
            color: '#1bd75f'
        }
    },
}))(InputBase);


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 545,
        maxHeight: 645,
        minHeight: 250,
        width: '100%',
        height: '54%'
    },
    media: {
        height: 540
    },
    btn1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        // marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 320
    },
    button: {
        backgroundColor: '#1bd75f',
        width: '100%',
        marginTop: '5%',
        marginBottom: '10%'
    }
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#1bd75f',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1bd75f',
        },
        '& .MuiOutlinedInput-root': {
            // '& fieldset': {
            //   borderColor: 'red',
            // },
            // '&:hover fieldset': {
            //   borderColor: 'yellow',
            // },
            '&.Mui-focused fieldset': {
                borderColor: '#1bd75f',
            },
        },
    },
})(TextField);

export default function InputCard(props) {
    const classes = useStyles();
    //   let { post } = props;
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <Card className={classes.card}>
            <CardActionArea>

                <div>
                    {
                        props.title ? <CardContent>
                            <Typography
                                style={{ textAlign: 'center', fontSize: '18px' }}
                                variant='body2'
                                color='textSecondary'
                                component='h1'>
                                {props.title}
                            </Typography>
                        </CardContent> : null
                    }
                </div>
            </CardActionArea>
            <CardActions className={classes.btn1}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column'
                    }}
                >
                    {props.fields.map(k => (
                        <div>
                            {
                                k.element === "input" ?
                                    <CssTextField
                                        id='outlined-basic'
                                        className={classes.textField}
                                        label={k.label}
                                        margin='normal'
                                        variant='outlined'
                                        type={k.type}
                                        onChange={(evt) => k.func(evt.target.value)}

                                    /> : k.element === "button" ?
                                        <Button
                                            variant='contained'
                                            color='#1bd75f'
                                            startIcon={<Icon>{k.icon}</Icon>}
                                            type='submit'
                                            className={classes.button}
                                            color='primary'
                                            onClick={() => k.func()}
                                        >
                                            {k.label}
                                        </Button> : k.element === "selector" ?
                                            <FormControl style={{ width: '100%' }}>
                                                <InputLabel id='demo-simple-select-label'>
                                                    {k.label}
                                                </InputLabel>
                                                <Select
                                                    labelId='demo-simple-select-label'
                                                    id='demo-simple-select'
                                                    // value={this.state.category}
                                                    onChange={(evt) => k.func(evt.target.value)}
                                                    // input={<CustomInput />}
                                                >
                                                    {k.items.map(item => (
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl> : null
                            }

                            {
                                // (() => props.fields.map(k => console.log(k.label && !k.button, k)))()
                            }

                        </div>
                    ))}


                </div>
            </CardActions>
        </Card>
    );
}
