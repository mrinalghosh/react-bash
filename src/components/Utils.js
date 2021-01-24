import { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core';

// underline color fix from - https://github.com/mui-org/material-ui/issues/13817
const color = "#fff";
const theme = createMuiTheme({
    palette: {
        common: { black: color, white: color },
        primary: { main: color, dark: color, light: color },
        text: { primary: color, secondary: color }
    },
    overrides: {
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottom: `1px solid ${color}`
                }
            }
        }
    }
});

const pageNames = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu']
const pageDirectory = pageNames.map((page) => ({ name: page, path: `/${page.toLowerCase()}` }));

// window dimensions callback functions

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}


export { useWindowDimensions, theme, pageDirectory };