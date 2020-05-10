import React, { Component } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export class ComboBox extends Component {
    
    
    render() {
        
        return (
            <React.Fragment>
                <FormControl margins="normal" >
                <Autocomplete
                id={this.props.id}
                options={this.props.options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} helperText={this.props.helperText} label={this.props.label} />}
                value={this.props.inputValue}
                onChange= {this.props.onChange}
                fullWidth={true}
                />
                </FormControl>
            </React.Fragment>
            );
    }
}

export default ComboBox
