import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { makeStyles } from '@material-ui/core';
// import { useWindowDimensions } from './Utils';
import { Line } from './Line';
import { Bar } from './Bar';

const useStyles = makeStyles({
    body: {
        backgroundColor: 'white',
        width: '750px',
        height: '450px',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        margin: '0',
        fontFamily: 'monospace',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }
})

const Terminal = () => {
    const classes = useStyles();

    const [termLines, setTermLines] = useState([0]);

    const handleEnterCommand = () => {
        if (termLines.length > 10) { // remove previous lines if bw 10 and 20 lines of text - doesn't remove previous lines
            // let temp = termLines;
            // temp.shift();
            // setTermLines([...temp, temp.length]);
            setTermLines([...termLines, termLines.length]);
        }
        else {
            setTermLines([...termLines, termLines.length]);
        }
    }

    return (
        // <MyContext.Provider>
        <Draggable>
            <div style={{ width: '750px' }}>
                <Bar />
                <div className={classes.body}>
                    {termLines.map(() => <Line handleEnterCommand={handleEnterCommand} />)}
                </div>
            </div>
        </Draggable >
        // </MyContext.Provider>
    )
}

export default Terminal;