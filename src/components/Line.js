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
                let dir;
                if (args.length > 2) {
                    return { err: true, dir: currentDirectory, show: true };
                } else if (args.length === 2) { // remain in current directory
                    if (args[1] === '.')
                        return { err: false, dir: currentDirectory, show: false };

                    if (args[1] === '..') { // go up a level
                        let temp = currentDirectory.split('/')
                        temp.pop(-1)
                        dir = temp.join('/')
                        setCurrentDirectory(dir)
                        return { err: false, dir: dir, show: false };
                    }

                    dir = currentDirectory + '/' + args[1] // go down a level
                    setCurrentDirectory(dir)
                    return { err: false, dir: dir, show: false }
                } else {
                    return { err: false, dir: currentDirectory, show: false }
                }
            case 'ls':
            case 'touch':
            case 'man':
            case 'mkdir':
            default:
                return params
        }

        // if (args[0] === 'cd') {

        // }
        // else if (result.slice(0, 2) === 'cd' && result.length === 2) { // do nothing
        //     setShowCommand(false)
        // } else if (result.slice(0, 3) === 'ls ' || (result.slice(0, 2) === 'ls' && result.length === 2)) {
        //     console.log('ls requested')
        //     // setArgs(result.slice(3))
        // } else if (result.slice(0, 4) === 'man ') {
        //     console.log('man requested')
        //     // setArgs(result.slice(4))
        // } else if (result.slice(0, 4) === 'help') {
        //     console.log('help requested')
        //     setCommand('help - available commands\ncd\nls\nman\nhelp')
        // } 
        // else {
        //     console.log('Command not recognized')
        //     return {
        //         cmd: '',
        //         dir: currentDirectory,
        //         show: false
        //     }
        // }
    }

    const classes = useStyles();

    const [command, setCommand] = useState(''); // final command
    const [result, setResult] = useState(''); // live input feed
    const [entered, setEntered] = useState(false); // lock input field on submission
    const [showCommand, setShowCommand] = useState(true);
    // const [args, setArgs] = useState('');
    const [directory, setDirectory] = useState(''); // directory needs to be seen on the next line and every line after

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setEntered(true);
            let { err, dir, show } = handleCommand(result);
            // console.log(dir);
            // console.log(show);
            err ? setCommand('zsh: command not found: ' + result) : setCommand(result);
            setShowCommand(show);
            setDirectory(dir);
            handleEnterCommand(dir);
        }}
        // onChange={() => {
        //     handleCommand();
        // }}
        >
            <div className={classes.text}>
                {/* https://stackoverflow.com/questions/17054150/in-field-labels-dont-line-up-with-input-text */}
                <label style={{
                    fontSize: '10pt',
                    margin: 0
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