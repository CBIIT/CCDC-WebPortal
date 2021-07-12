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
import { Chip, Grid, Link, Typography } from "@material-ui/core";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

import DetailText from "./DetailText";
import history from "../utilities/history";
import { toProperCase } from "../utilities/toProperCase";

const renderDigests = (digests, browseOrSearch) => {
    return digests.map(digest => {
        return (
            <div className="digest-card" key={digest.id}>
                <div className="card-body">
                    <Typography variant="h5" component="h5" className="buffer">
                        <LibraryBooksOutlinedIcon className="inline-align inline-text-icon"/>
                        <Link tabIndex={0} className="inline-align result-link" onClick={() => {
                            history.push({
                                pathname: 'digest/' + digest.id,
                                state: {
                                    id: digest.id,
                                    browseOrSearch: browseOrSearch,
                                    showResourceBreadcrumb: true,
                                },
                            });
                        }}>
                            {digest.digestResourceName || (digest.dataResourceName + " Dataset")}
                        </Link>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={11}>
                            {digest.publishedIn && 
                                <DetailText label="Published In:&nbsp;&nbsp;" 
                                            text={digest.publishedIn}
                                            isLink={true}/>}
                            {digest.componentPoc &&
                                <DetailText label="Point of Contact (POC):&nbsp;&nbsp;" 
                                            text={digest.componentPoc}/>}
                            {digest.componentPocEmail && 
                                <DetailText label="POC Email:&nbsp;&nbsp;" 
                                            text={digest.componentPocEmail}
                                            isLink={true}/>}
                            {renderDigestElements(digest.digestElement)}
                        </Grid>
                        <Grid item xs={1} className="bottom-corner-align">
                            <Chip className="mb-2 text-muted" label={digest.componentType.replace(/_/g," ")}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    });
}

const renderDigestElements = (elems, renderOther=false, renderProjects=false) => {
    return elems.map(elem => {
        const key = Object.keys(elem).toString();
        if (key === "other" && renderOther) {
            return renderOtherDigestElements(elem[key]);
        } else if (key === "projects" && renderProjects) {
            return renderDigestProjects(elem[key]);
        } else if ((key !== "other" && !renderOther) && key !== "projects" && !renderProjects) {
            return renderCoreDigestElement(key, elem);
        } else {
            return null;
        }
    });
}

// Render a single element
const renderCoreDigestElement = (key, elem) => {
    const valueArray = Array.isArray(elem[key])
        ? Object.values(elem[key]).map(valueObject => Object.values(valueObject))
        : [elem[key]?.toString()];
        
    // check if label is published in
    const valueText = (key === "published_in")
        ? valueArray.join('; ').replace(/,/g, ", ")
        : valueArray.join('; ').replace(/,/g, ": ").replace(/;/g, ", ");

    return (
        <DetailText key={key}
                    label={(key === "case_id")
                        ? "Number of Cases:\u00A0\u00A0"
                        : (key === "sample_id")
                            ? "Number of Samples:\u00A0\u00A0"
                            : (key === "donor_id")
                                ? "Number of Donors:\u00A0\u00A0"
                                : toProperCase(key.replace(/_/g," ")) + ":\u00A0\u00A0"}
                    text={toProperCase(valueText)} 
                    isArray={valueText.indexOf(',') > -1 && valueText.startsWith("http")}
                    isLink={valueText.startsWith("http")}/>
    )
}

// Render other (non-core) elements
const renderOtherDigestElements = (otherElems) => {
    return Object.values(otherElems).map((otherElem, index) => {
        // Format: {'name': <name>, 'value': <value>}
        return (
            // &nbsp; does not work with JSX, use \u00A0 instead
            <DetailText key={index}
                        label={toProperCase(otherElem.name.replace(/_/g," ")) + ":\u00A0\u00A0"} 
                        text={(otherElem.name.toLowerCase() === "description" // don't capitalize description
                                ? otherElem.value
                                : toProperCase(otherElem.value) || otherElem.int_value?.toString())} 
                        isLink={otherElem.value?.startsWith("http")}/>
        )
    });
}

// Render projects
const renderDigestProjects = (projects) => {
    return Object.entries(projects).map(([key, value]) => {
        return (
            <div key={key} className="digest-card">
                <div className="card-body">
                    <Typography variant="h6" component="h5">
                        {key}
                    </Typography>
                    {value.map(elem => renderCoreDigestElement(Object.keys(elem).toString(), elem))}
                </div>
            </div>
        )
    });
}


class DataDigestList extends Component {
    state = {
        dataDigests: {}
    };

    componentDidMount() {
        const searchEndpoint = 'http://localhost:8080/podcat/api/dataResources/' + this.props.result.id + '/dataDigests';
        fetch(searchEndpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    dataDigests: data._embedded.dataDigests,
                });
            })
            .catch(console.log);
    }
    
    render() {
        const digests = this.state.dataDigests;

        return (
            <div>
                {(digests.length && digests.length !== 0) && 
                    <div>
                        <Typography variant="h5" component="h4" className="buffer">
                            Dataset Summaries ({digests.length})
                        </Typography>
                        <div className="digest-container">
                            {renderDigests(digests, this.props.browseOrSearch)}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export {DataDigestList, renderDigests, renderDigestElements, renderOtherDigestElements, renderDigestProjects};