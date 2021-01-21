import React from 'react';
import { Input } from '@material-ui/core';

class CommandLine extends React.Component {
    state = {
        input: ''
    };

    handleChange = (event) => {
        this.setState({ input: event.target.value });
        console.log(this.state)
    }

    render() {
        return (
            <Input handleChange={this.handleChange} />
        );
    }
}

export default CommandLine;