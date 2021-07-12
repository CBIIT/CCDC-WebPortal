/*****************************************************************************************************************************
NOTICE
This (software/technical data) was produced for the U. S. Government under Contract Number 75FCMC18D0047, and is subject to 
Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General. No other use other than that granted to the U. S. 
Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written 
permission of The MITRE Corporation.For further information, please contact The MITRE Corporation, Contracts Management Office, 
7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000.
© 2021 The MITRE Corporation.
******************************************************************************************************************************/

import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CancelIcon from '@material-ui/icons/Cancel'
import { green, red, grey } from '@material-ui/core/colors';

export default class AutoIngestIcon extends Component {
    _status = this.props.status;

    render() {        
        const iconStyleMap = {
            success: {
                color: green[500],
            },
            failure: {
                color: red[500],
            },
            default: {
                color: grey[500],
            }
        }

        switch (this._status) {
            case "Success":
                return (
                    <Typography align="right" component="div" title="Auto-ingest Status: Success">
                        <CheckCircleIcon style={iconStyleMap[this._status.toLowerCase()]}></CheckCircleIcon>
                    </Typography>
                )
            case "Failure":
                return (
                    <Typography align="right" component="div" title="Auto-ingest Status: Failure">
                        <ErrorIcon style={iconStyleMap[this._status.toLowerCase()]}></ErrorIcon>
                    </Typography>
                )
            default:
                return (
                    <Typography align="right" component="div" title="Auto-ingest Status: N/A">
                        <CancelIcon style={iconStyleMap["default"]}></CancelIcon>
                    </Typography>
                )
        }
    }
}
