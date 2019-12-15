import React, { Fragment, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            textAlign: 'center',
            color: '#1bd75f'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200
            }
        }
    },
    
    appBar: {
        background: '#1a1414'
    },
    list: {
        width: 250,
        color: '#1bd75f',
        backgroundColor: '#1a1414'
    },
    customList: {
        backgroundColor: '#1a1414'
    }
}));


function NavbarC(props) {
    const materialClasses = useStyles();
    const [drawer, setDrawer] = useState(false);

    let items = [{ link: '/', label: 'Submit' }, { link: '/admin', label: 'Admin'}, {link: '/references', label: 'References'}];

    const handleSearch = (char) => {
        props.search(char);
    };

    const handleClick = event => {
        props.history.push(event);
    };

    const sideList = () => (
        <div
            className={materialClasses.list}
            role='presentation'
            onClick={() => setDrawer(false)}
        >
            <List >
                {items.map(text => (
                    <ListItem
                        onClick={() => handleClick(text.link)}
                        button
                        key={text.label}
                    >
                        <ListItemText primary={text.label} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Fragment>
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                {sideList()}
            </Drawer>
            <AppBar className={materialClasses.appBar} position='static'>
                <Toolbar >
                    <IconButton
                        edge='start'
                        className={materialClasses.menuButton}
                        color='inherit'
                        aria-label='open drawer'
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        className={materialClasses.title}
                        variant='h6'
                        noWrap
                    >
                        Radio Top 5
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}


export default NavbarC;
