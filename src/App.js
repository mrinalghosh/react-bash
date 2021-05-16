
/* TODO:
1. fix directories not changing
2. fix scrollbar not changing when resized
3. add echo,... commands... - see implementation in react-console-emulator
4. minimization
5. closing
6. icon to open again


MINOR:
fix spacing on left side of box
*/

import React, { useState } from 'react';
import './App.css';
import { MuiThemeProvider, Input } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { pageDirectory, theme } from './components/Utils';
import Terminal from './components/Terminal'
// import Terminal from 'react-console-emulator';


const NotFound = () => <h1 style={{ color: 'white' }}>404</h1>; // THE CAPITAL LETTER MATTERS
const NatoPage = (name) => <h1 style={{ color: 'white' }}>{name}</h1>;

function App() {
  const [command, setCommand] = useState('')
  const [text, setText] = useState('')

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: '', height: '100vh', flexDirection: 'column' }}>
        <Router>
          <Switch>
            {/* Remove terminal from here once done testing */}
            <Route exact path='/' component={Terminal} />
            {
              pageDirectory.map(({ name, path }, key) =>
                <Route exact path={path} component={() => NatoPage(name)} key={key} />
              )
            }
            <Route path='/terminal' component={Terminal} />
            <Route path='*'>
              <Redirect to='/not-found' />
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );

  // const commands = {
  //   echo: {
  //     description: 'Echo a passed string.',
  //     usage: 'echo <string>',
  //     fn: (...args) => args.join(' ')
  //   }
  // }

  // return (
  //   <Terminal
  //     commands={commands}
  //     welcomeMessage={'Welcome to the React terminal!'}
  //     promptLabel={'user@ghoshm:~$'}
  //   />
  // )

}

export default App;
