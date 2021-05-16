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

const Line = ({ handleEnterCommand, currentDirectory, setCurrentDirectory }) => {
    // problem: directory is global - rerenders all lines above - need to have local and pass to next line 
    const handleCommand = (result) => {
        console.log(result)
        let args = result.split(' ');

        let params = { // default parameters - when command not recognized
            err: true,
            dir: currentDirectory,
            show: true
        }

        switch (args[0]) {
            case 'cd':
                if (args.length > 2) { // two many arguments
                    return { err: true, dir: currentDirectory, show: true }

                } else if (args.length === 2) { // remain
                    if (args[1] === '.')
                        return { err: false, dir: currentDirectory, show: false }

                    else if (args[1] === '~')  // go home
                        setCurrentDirectory('')

                    else if (args[1] === '..') { // up level
                        /* TODO: deal with multiple jumps ../.. */
                        let temp = currentDirectory.split('/')
                        temp.pop(-1)
                        setCurrentDirectory(temp.join('/'))
                    }

                    else {
                        setCurrentDirectory(currentDirectory + '/' + args[1])
                    }

                    return { err: false, dir: currentDirectory, show: false }

                } else { // cd without argument
                    /* TODO: error message for this */
                    return { err: true, dir: currentDirectory, show: false }
                }
            case 'ls':
            case 'touch':
            case 'man':
            case 'mkdir':
            default:
                return params
        }
    }

    const classes = useStyles();

    const [command, setCommand] = useState(''); // final command
    const [result, setResult] = useState(''); // live input feed
    const [entered, setEntered] = useState(false); // lock input field on submission
    const [showCommand, setShowCommand] = useState(true);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setEntered(true);
            let { err, dir, show } = handleCommand(result);
            err ? setCommand('zsh: command not found: ' + result) : setCommand(result);
            setShowCommand(show);
            handleEnterCommand(dir);
        }}>
            <div className={classes.text} style={{ marginTop: '3px', marginLeft: '5px' }}>
                {/* https://stackoverflow.com/questions/17054150/in-field-labels-dont-line-up-with-input-text */}
                <label style={{
                    fontSize: '10pt',
                    margin: 0,
                    marginRight: '5px'
                }}>
                    user@ghosh:~{currentDirectory}$
                    {/* user@ghosh:~$ */}
                </label>
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
                    onChange={(e) => {
                        setResult(e.target.value);
                    }}
                />
            </div>
            {
                (command === '' || !showCommand) ?
                    '' :  // no output
                    <h6 style={{ // else show result
                        fontFamily: 'monospace',
                        fontSize: '10pt',
                        margin: 0,
                        marginLeft: '5px',
                        fontWeight: 'normal',
                        textAlign: 'left'
                    }}>
                        {command}
                        <br />
                    </h6>
            }
        </form >
    )
}

export { Line };