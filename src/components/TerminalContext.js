import React, { useState, createContext } from 'react';

export function useTerminal() {
    return useContext(TerminalContext);
}

const TerminalContext = ({ children }) => {
    const MyContext = createContext();

    const [termLines, setTermLines] = useState([0]); // dummy array to enumerate the number of lines to enter
    const [directory, setDirectory] = useState('')

    const value = {
        termLines,
        setTermLines,
        directory // ???
    }

    return (
        <MyContext.Provider value={ }>

        </MyContext.Provider>
    )

}
