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
import { Typography, Grid } from '@material-ui/core';

import parse from 'html-react-parser';

export default class DetailText extends Component {
    _label = this.props.label;
    _text = this.props.text.replace(/_/g, " ");

    // Optional variables
    _isLink = this.props.isLink ? this.props.isLink : false;
    _isArray = this.props.isArray ? this.props.isArray : false;
    _isSearch = this.props.isSearch ? this.props.isSearch : false; 
    _isGrid = this.props.isGrid ? this.props.isGrid : false;
    _isVertical = this.props.isVertical ? this.props.isVertical : false;

    render() {        
        var parsedText = this._text.replace(/(<([^>]+)>)/gi, '') // strip HTML tags

        // Check if dealing with an array
        if (this._isArray && parsedText.indexOf(',') > -1) {
            parsedText = parsedText.split(',');
        } else if (this._isArray && parsedText.indexOf(';') > -1) {
            parsedText = parsedText.split(';');
        }
        
        // Format label and value in a two-column Grid
        if (this._isGrid) {
            return (
                <Grid container>
                    <Grid item xs={6} className="overflow-auto">
                        <LabelText label={this._label}/>
                    </Grid>
                    <Grid item xs={6} className="overflow-auto">
                        <ValueText parsedText={parsedText} 
                                   text={this._text}
                                   isLink={this._isLink} 
                                   isArray={this._isArray}
                                   isSearch={this._isSearch}/>
                    </Grid>
                </Grid>
            )
        }
        
        return (
            <div className={this._isVertical ? "container-column" : "container"}>
                <LabelText label={this._label}/>
                <ValueText parsedText={parsedText} 
                           text={this._text}
                           isLink={this._isLink} 
                           isArray={this._isArray}
                           isSearch={this._isSearch}/>
            </div>
        )
    }
}

class LabelText extends Component {
    render() {
        return (
            <Typography variant="body1" component="span" className="label">
                {this.props.label}
            </Typography>
        )
    }
}

class ValueText extends Component {
    render() {
        if (this.props.isLink && this.props.isArray) {
            return (
                <div>
                    {this.props.parsedText.map((result, index) => (
                        <div key={index}>
                            <a href={result} target="_blank" rel="noreferrer" component="a">
                                <Typography color="secondary" variant="body1" component="span" className="link-overflow">
                                    {parse(result)}
                                </Typography>
                            </a>
                        </div>
                    ))}
                </div>
            )
        } 
        
        if (this.props.isLink) {
            return (
                <a href={this.props.parsedText} target="_blank" rel="noreferrer" component="a">
                    <Typography color="secondary" variant="body1" component="span" className="link-overflow">
                        {parse(this.props.text)}
                    </Typography>
                </a>
            )
        }

        return (
            <Typography variant="body1" component="span" className={!this.props.isSearch ? "ellipsis-overflow" : ""}>
                {parse(this.props.text)}
            </Typography>
        )
    }
}