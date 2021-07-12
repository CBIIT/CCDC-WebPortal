/*****************************************************************************************************************************
NOTICE
This (software/technical data) was produced for the U. S. Government under Contract Number 75FCMC18D0047, and is subject to 
Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General. No other use other than that granted to the U. S. 
Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written 
permission of The MITRE Corporation.For further information, please contact The MITRE Corporation, Contracts Management Office, 
7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000.
© 2021 The MITRE Corporation.
******************************************************************************************************************************/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import blue from "@material-ui/core/colors/blue";

const styles = {
    root: {
        color: blue[600],
        "&$checked": {
            color: blue[500],
        },
    },
    checked: {},
};

class CheckboxItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCheckboxChange = (event) => {
        const { checkboxChangeCallback } = this.props;
        checkboxChangeCallback(event.target.checked);
    };

    render() {
        const { classes, checkboxValue, checkboxLabel, checked } = this.props;
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={this.handleCheckboxChange}
                        value={checkboxValue}
                        inputProps={{ 'aria-labelledby': checkboxValue }}
                        classes={{
                            root: classes.root,
                            checked: classes.checked,
                        }}
                        name={checkboxLabel}
                    />
                }
                label={checkboxLabel}
            />
        );
    }
}

export default withStyles(styles)(CheckboxItem);

CheckboxItem.propTypes = {
    classes: PropTypes.object.isRequired,
    checkboxLabel: PropTypes.string,
    checkboxValue: PropTypes.string,
    checked: PropTypes.bool,
    handleCheckboxChange: PropTypes.func,
};
CheckboxItem.defaultProps = {
    handleCheckboxChange: null,
};
