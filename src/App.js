import React, { useState } from 'react';
import './App.css';
import { MuiThemeProvider, Input } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { pageDirectory, theme } from './components/Utils';
import Terminal from './components/Terminal'

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

        <form onSubmit={(e) => { e.preventDefault(); setCommand(text); }}>
          <Input
            spellCheck={false}
            placeholder='cd ...'
            style={{ color: 'white' }}
            onChange={(e) => setText(e.target.value)}
          />
        </form>

        <h3 style={{ color: 'white' }}>{text}</h3>
        <h3 style={{ color: 'lightsteelblue' }}>{`temp@ghosh:~$ ${command}`}</h3>

      </div>
    </MuiThemeProvider>
  );
}

export default App;
