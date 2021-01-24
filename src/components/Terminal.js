import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Line } from './Line';
import { Bar } from './Bar';
import DraggableDiv from './DraggableDiv';

const useStyles = makeStyles({
    body: {
        backgroundColor: 'white',
        minHeight: '400px',
        height: '400px', // this works but is not a good way - get parent height to cap the height before scrolling begins
        // maxHeight: '100%',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        margin: '0',
        fontFamily: 'monospace',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        overflowY: 'scroll',
    }
})

const Terminal = () => {
    // TODO: onClick div for handling focus
    // https://stackoverflow.com/questions/57200730/react-way-of-setting-focus-on-a-particular-button-in-functional-component
    // https://stackoverflow.com/questions/43805132/click-on-div-to-focus-input-react

    const classes = useStyles();

    const [currentDirectory, setCurrentDirectory] = useState('');
    const [termLines, setTermLines] = useState([{ index: 0, directory: '' }]);

    const handleEnterCommand = (directory) => {
        let lines = [...termLines, {
            index: termLines.length,
            // directory: termLines.slice(-1)[0].directory + directory
            directory: directory
        }];
        setTermLines(lines);
        console.log(lines);
    }

    return (
        <DraggableDiv>
            <Bar />
            <div className={classes.body}>
                {termLines.map(() => <Line
                    handleEnterCommand={handleEnterCommand}
                    currentDirectory={currentDirectory}
                    setCurrentDirectory={setCurrentDirectory}
                />)}
            </div>
        </DraggableDiv>
    )
}

export default Terminal;