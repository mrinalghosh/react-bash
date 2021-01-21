import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    text: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        margin: 0,
    }
})

const Line = ({ handleEnterCommand }) => {
    const classes = useStyles();

    const [command, setCommand] = useState(''); // final cmd value
    const [result, setResult] = useState(''); // live input 
    const [entered, setEntered] = useState(false); // lock on submission

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setCommand(result);
            setEntered(true);
            handleEnterCommand();
        }} >
            <div className={classes.text}>
                {/* https://stackoverflow.com/questions/17054150/in-field-labels-dont-line-up-with-input-text */}
                <label style={{
                    fontSize: '10pt',
                    margin: 0
                }}>user@ghosh:~$</label>
                <input
                    disabled={entered}
                    autoFocus
                    style={{
                        width: '700px',
                        background: 'transparent',
                        outline: 'none',
                        border: 'none',
                        fontFamily: 'inherit',
                        fontSize: '10pt',
                        margin: 0
                    }}
                    onChange={(e) => setResult(e.target.value)}
                />
            </div>
            {command === '' ? '' :
                <h6 style={{ // result
                    fontFamily: 'monospace',
                    fontSize: '10pt',
                    margin: 0,
                    fontWeight: 'normal',
                    textAlign: 'left'
                }}>
                    {command}
                    <br />
                </h6>
            }
        </form>
    )
}

export { Line };