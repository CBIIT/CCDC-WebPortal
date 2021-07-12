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
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

export default class Filter extends Component {
    state = {
        filterType: this.props.filterType,
        filterLabel: this.props.filterLabel,
        key: this.props.key,
        field: this.props.field,
    }

    // Update state on props change
    static getDerivedStateFromProps(nextProps) {
        return({
            filterType: nextProps.filterType,
            filterLabel: nextProps.filterLabel,
            key: nextProps.key,
            field: nextProps.field,
        });  
    }

    handleDropdownClick = (value) => {
        let openFilterMenus = JSON.parse(sessionStorage.getItem('openFilterMenus'))
        openFilterMenus[value] = !openFilterMenus[value]
        sessionStorage.setItem('openFilterMenus', JSON.stringify(openFilterMenus));
        this.forceUpdate(); // Force update without state change
    }

    render() {
        let isFilterOpen = JSON.parse(sessionStorage.getItem('openFilterMenus'))
            ? JSON.parse(sessionStorage.getItem('openFilterMenus'))[this.state.filterType]
            : true;

        return(
            <div aria-labelledby={this.state.filterLabel + " filter" + (isFilterOpen ? " is expanded" : " is collapsed")}>
                <ListItem button 
                          key={1 + "-" + this.state.filterType + "Item"} 
                          className="no-padding"
                          onClick={() => this.handleDropdownClick(this.state.filterType)}>
                    <ListItemText primary={this.state.filterLabel}
                                  primaryTypographyProps={{
                                    variant: "overline", 
                                    component: "h4"
                                  }}/>
                    {isFilterOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse key={this.state.key}
                          in={isFilterOpen}
                          timeout='auto'
                          unmountOnExit>
                    <List component='ul' disablePadding key={this.state.key}>
                        {this.props.renderCheckboxes(this.state.field)}
                    </List>
                </Collapse>
            </div>
        )
    }
}
