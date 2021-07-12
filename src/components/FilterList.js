// // import React from "react";

// // const FilterList = () => (
// //     <div>
// //         <h2>Filter List</h2>
// //         <p>
// //             This is the filter list page.
// //         </p>
// //     </div>
// // );

// // export default FilterList;



// import React from "react";
// import { Divider, ListItem, Typography } from "@material-ui/core";

// import CheckboxItem from "./CheckboxItem";
// import Filter from "./Filter";
// import { toProperCase } from "../utilities/toProperCase";

// /* 
//  * Returns an array of filter options with no duplicates.
//  */
// const getOptions = function(results, key) {
//     return [...new Set(results.map((resource) => resource[key] || ""))];
// }

// /*
//  * Apply all filters to a list of results and returns the filtered list.
//  */
// const filterResults = function(results, filterOptions) {
//     let filteredResults = results;
//     for (const filter in filterOptions) {
//         if (filterOptions[filter].length < 1) continue;
//         filteredResults = filteredResults.filter(resource => {
//             for (const index in filterOptions[filter]) {
//                 let filterValue = filterOptions[filter][index];
//                 if (filter === "numberOfDigest") { // Handle digest alternative options
//                     if ((filterValue === "Dataset Summaries Available" && resource[filter]) || 
//                         (filterValue === "No Dataset Summaries Available" && !resource[filter])) return true;
//                 } else if (filter === "tools") { // Handle tools alternative options
//                     if ((filterValue === "Visualization" && resource[filterValue.toLowerCase()] === "Yes") ||
//                         (filterValue === "Analytics" && resource[filterValue.toLowerCase()] === "Yes")) return true;
//                 } else if (filter === "contentType") { // Handle contentType alternative options
//                     if ((filterValue === "Cell Lines Data" && resource["hasCellLinesData"] === "Yes") ||
//                         (filterValue === "Clinical Data" && resource["hasClinicalData"] === "Yes") ||
//                         (filterValue === "Imaging Data" && resource["hasImagingData"] === "Yes") ||
//                         (filterValue === "Omics Data" && resource["hasGenomicsOmics"] === "Yes") ||
//                         (filterValue === "Xenograft Data" && resource["hasXenograftData"] === "Yes")) return true;
//                 } else {
//                     if ((filterValue === "" && resource[filter] === null) || 
//                         (filterValue === resource[filter])) return true;
//                 }
//             }
//             return false;
//         });
//     } 
//     return filteredResults;
// }

// class FilterList  {
//     _datasetFilterFlag = true; // toggle "Dataset Summaries in PODCat" filter

//     componentDidUpdate(oldProps) {
//         /* 
//          * Update filters and results based on persistent data when 
//          * navigating back to the page
//          */
//         if((oldProps.results !== this.props.results) && sessionStorage.getItem('filterOptions')) {
//             this.handleFilterChange(
//                 this.props.results, 
//                 JSON.parse(sessionStorage.getItem('filterOptions')));
//         }
//     }
    
//     /* 
//      * Add filter to filterOptions if checkbox is checked and 
//      * delete filter from filterOptions if checkbox is unchecked
//      */
//     handleChildCheckboxChange = (checkbox, filterType, isChecked) => {
//         let filterOptions = JSON.parse(sessionStorage.getItem('filterOptions'));
//         if (filterOptions[filterType].includes(checkbox) && !isChecked) {
//             filterOptions[filterType].splice(filterOptions[filterType].indexOf(checkbox), 1);
//         } else if (!filterOptions[filterType].includes(checkbox) && isChecked) {
//             filterOptions[filterType].push(checkbox);
//         }
//         sessionStorage.setItem('filterOptions', JSON.stringify(filterOptions))
//         this.handleFilterChange(this.props.results, filterOptions);
//     };

//     handleFilterChange = (results, filterOptions) => {
//         const filteredResults = filterResults(results, filterOptions);
//         this.props.onFilterResults(filterOptions, filteredResults);
//     }

//     renderCheckboxes = (filterType) => {
//         const results = this.props.results;
//         if (!results) return null;

//         const optionsMap = {
//             numberOfDigest: [
//                 "Dataset Summaries Available", 
//                 "No Dataset Summaries Available"
//             ],
//             tools: [
//                 "Visualization", 
//                 "Analytics"
//             ],
//             contentType: [
//                 "Cell Lines Data", 
//                 "Clinical Data", 
//                 "Imaging Data",
//                 "Omics Data",
//                 "Xenograft Data"
//             ],
//         }
//         let options = optionsMap[filterType] || getOptions(results, filterType);

//         return options.map((checkboxValue, index) => {        
//             if (!checkboxValue) return '';
//             const filterOptions = JSON.parse(sessionStorage.getItem('filterOptions'));

//             return (
//                 <ListItem key={index + "-" + filterType} className="no-padding">
//                     <CheckboxItem
//                         key={index + "-" + filterType}
//                         checkboxLabel={filterType === "type" 
//                             ? toProperCase(checkboxValue.replace(/_/g," "), true)
//                             : checkboxValue
//                         }
//                         checkboxValue={checkboxValue}
//                         checked={filterOptions && filterOptions[filterType] 
//                             ? filterOptions[filterType].includes(checkboxValue) 
//                             : false
//                         }
//                         checkboxChangeCallback={(checkStatus) => 
//                             this.handleChildCheckboxChange(checkboxValue, filterType, checkStatus)}
//                     />
//                 </ListItem>
//             )
//         });
//     };

//     render() {
//         return (
//             <div className="filter-container width-inherit">
//                 <Typography variant="h6" component="h3">Resource Description</Typography>
//                 <Divider />

//                 <Filter filterType="type" 
//                         filterLabel="Data Resource Type" 
//                         key="1" 
//                         field="type" 
//                         renderCheckboxes={this.renderCheckboxes}>
//                 </Filter>
//                 <Divider/>

//                 {this._datasetFilterFlag &&
//                     <div>
//                         <Filter filterType="digest" 
//                                 filterLabel="Dataset Summaries in PODCat" 
//                                 key="2" 
//                                 field="numberOfDigest" 
//                                 renderCheckboxes={this.renderCheckboxes}>
//                         </Filter>
//                         <Divider/>
//                     </div>}

//                 <Filter filterType="contentType" 
//                         filterLabel="Resource Data Content Types" 
//                         key="3" 
//                         field="contentType" 
//                         renderCheckboxes={this.renderCheckboxes}>
//                 </Filter>
//                 <Divider/>
                
//                 <br/>
//                 <Typography variant="h6" component="h3">Capabilities</Typography>
//                 <Divider/>
                
//                 <Filter filterType="tools" 
//                         filterLabel="Data Resource Tools" 
//                         key="4" 
//                         field="tools" 
//                         renderCheckboxes={this.renderCheckboxes}>
//                 </Filter>
//                 <Divider/>
                
//                 <Filter filterType="apiDistinction" 
//                         filterLabel="API" 
//                         key="5" 
//                         field="apiDistinction" 
//                         renderCheckboxes={this.renderCheckboxes}>
//                 </Filter>
//                 <br/>
//             </div>
//         );
//     };
// }

// export default {FilterList, toProperCase};






import React, { Component } from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";



export default class FilterList  {

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




// export default class FilterList  {

//     state = {
//         filterType: this.props.filterType,
//         filterLabel: this.props.filterLabel,
//         key: this.props.key,
//         field: this.props.field,
//     }

//     // Update state on props change
//     static getDerivedStateFromProps(nextProps) {
//         return({
//             filterType: nextProps.filterType,
//             filterLabel: nextProps.filterLabel,
//             key: nextProps.key,
//             field: nextProps.field,
//         });  
//     }

//     handleDropdownClick = (value) => {
//         let openFilterMenus = JSON.parse(sessionStorage.getItem('openFilterMenus'))
//         openFilterMenus[value] = !openFilterMenus[value]
//         sessionStorage.setItem('openFilterMenus', JSON.stringify(openFilterMenus));
//         this.forceUpdate(); // Force update without state change
//     }

//     render() {
//         let isFilterOpen = JSON.parse(sessionStorage.getItem('openFilterMenus'))
//             ? JSON.parse(sessionStorage.getItem('openFilterMenus'))[this.state.filterType]
//             : true;

//         return(
//             <div aria-labelledby={this.state.filterLabel + " filter" + (isFilterOpen ? " is expanded" : " is collapsed")}>
//                 <ListItem button 
//                           key={1 + "-" + this.state.filterType + "Item"} 
//                           className="no-padding"
//                           onClick={() => this.handleDropdownClick(this.state.filterType)}>
//                     <ListItemText primary={this.state.filterLabel}
//                                   primaryTypographyProps={{
//                                     variant: "overline", 
//                                     component: "h4"
//                                   }}/>
//                     {isFilterOpen ? <ExpandLess/> : <ExpandMore/>}
//                 </ListItem>
//                 <Collapse key={this.state.key}
//                           in={isFilterOpen}
//                           timeout='auto'
//                           unmountOnExit>
//                     <List component='ul' disablePadding key={this.state.key}>
//                         {this.props.renderCheckboxes(this.state.field)}
//                     </List>
//                 </Collapse>
//             </div>
//         )
//     }
// }