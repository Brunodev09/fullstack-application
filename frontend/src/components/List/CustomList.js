import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 760,
        backgroundColor: theme.palette.background.paper
    },
}));

/**
 * My customization of the List component from MaterialUI. Responsible for generating lists dynamically. 
 * It respects the type: { link: <string>, comment: <string> }
 */
export default function CustomList(props) {
    const classes = useStyles();
    let list = props.list;
    let label = props.label;

    const handleClick = (link) => {
        props.openRef(link);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <List component="nav" className={classes.root} aria-label={label}>
                {props.list.map((k, i) => (
                    i === 0 ? <div>
                        <ListItem button>
                        <ListItemText style={{ textAlign: 'center' }} primary={label} />
                    </ListItem>
                        <ListItem onClick={() => handleClick(k.link)} button>
                            <ListItemText primary={k.link} />
                            <ListItemText secondary={k.comment} />
                        </ListItem></div> :
                        <ListItem onClick={() => handleClick(k.link)} button>
                            <ListItemText primary={k.link} />
                            <ListItemText secondary={k.comment} />
                        </ListItem>
                ))}

            </List>
        </div>

    );
}