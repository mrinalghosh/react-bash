import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Line } from './Line';
import { Bar } from './Bar';
import DraggableDiv from './DraggableDiv';

const useStyles = makeStyles({
    body: {
        backgroundColor: 'white',
        minHeight: '400px',
        height: '300px', // this works but is not a good way - get parent height to cap the height before scrolling begins
        // maxHeight: '100%',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        margin: '0',
        fontFamily: 'monospace',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        overflowY: 'scroll',
        // ::-webkit-scrollbar { // this would work but how do i use it?
        //     width: 0px;
        //     background: transparent;
        // }
    }
})

const Terminal = () => {
    // TODO: onClick div for handling focus
    // https://stackoverflow.com/questions/57200730/react-way-of-setting-focus-on-a-particular-button-in-functional-component
    // https://stackoverflow.com/questions/43805132/click-on-div-to-focus-input-react

    const classes = useStyles();

    const [termLines, setTermLines] = useState([0]);

    const handleEnterCommand = () => {
        // don't need to handle overflow - just scroll
        setTermLines([...termLines, termLines.length]);
    }

    return (
        <DraggableDiv>
            <Bar />
            <div className={classes.body}>
                {termLines.map(() => <Line handleEnterCommand={handleEnterCommand} />)}
            </div>
        </DraggableDiv>
    )
}

export default Terminal;