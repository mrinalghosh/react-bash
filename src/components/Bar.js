import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    bar: {
        width: '750px',
        height: '25px',
        backgroundColor: '#dad9d9',
        margin: '0 auto'
    },
    button: {
        borderRadius: '100%',
        width: '15px',
        height: '15px',
        margin: '0 auto',
        position: 'relative',
    },
});

export const Bar = () => {

    const classes = useStyles();

    const [showExit, setShowExit] = useState(false); // show exit button on hover
    const [showMin, setShowMin] = useState(false);
    const [showMax, setShowMax] = useState(false);

    return (
        <div className={classes.bar} style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
            <div className={classes.button}
                style={{ backgroundColor: '#e94b35', left: '-47%', bottom: '-20%', fontSize: '8pt' }} // 8 is the perfect vertical font size
                onMouseEnter={() => setShowExit(true)}
                onMouseLeave={() => setShowExit(false)}
            > {showExit ? '✕' : ''} </div>
            <div className={classes.button}
                style={{ backgroundColor: '#f0f000', left: '-44%', bottom: '40%', fontSize: '7.5pt' }}
                onMouseEnter={() => setShowMin(true)}
                onMouseLeave={() => setShowMin(false)}
            > {showMin ? '-' : ''} </div>
            <div className={classes.button}
                style={{ backgroundColor: '#1aaf5c', left: '-41%', bottom: '99%', fontSize: '8pt' }}
                onMouseEnter={() => setShowMax(true)}
                onMouseLeave={() => setShowMax(false)}
            > {showMax ? '+' : ''}</div>
        </div>
    )
}