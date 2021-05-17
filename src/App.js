// import React, { useState } from 'react';
// // import './App.css';
// // import { MuiThemeProvider, Input } from '@material-ui/core';
// // import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// // import { pageDirectory, theme } from './components/Utils';
// import Terminal from 'react-console-emulator';

// function App() {
//   const commands = {
//     echo: {
//       description: 'Echo a passed string.',
//       usage: 'echo <string>',
//       fn: (...args) => args.join(' ')
//     }
//   }

//   return (
//     <Terminal
//       commands={commands}
//       welcomeMessage={'Welcome to the React terminal!'}
//       promptLabel={'user@ghoshm:~$'}
//     />
//   )

// }

// export default App;

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';
import Toggle from './components/Toggle'

// The function that toggles between themes
function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  // Return the layout based on the current theme
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        {/* // Pass the toggle functionality to the button
        <button onClick={toggleTheme}>Toggle theme</button>
        <h1>It's a light theme!</h1>
        <footer>
        </footer> */}
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <h1>It's a {theme === 'light' ? 'light theme' : 'dark theme'}!</h1>
      </>
    </ThemeProvider>
  );
}

export default App;