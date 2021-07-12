// import React from "react";

// const ResourceDetail = () => (
//     <div>
//         Sorry, something went wrooooong.
//     </div>
// );

// export default ResourceDetail;






import React, { Component } from "react";
import {Link} from "react-router-dom";
import {
    Badge,
    Breadcrumbs,
    Chip,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

import Header from "./common/Header";
//import { DataDigestList } from "./DataDigestList";
import DetailText from "./DetailText";
import AutoIngestIcon from "./AutoIngestIcon";
import history from "../utilities/history";
import { toProperCase } from "../utilities/toProperCase";
import parse from "html-react-parser";

export default class DatasetDetail extends Component {
    // state = {
    //     result: {},
    //     id: this.props.location.state.id,
    //     browseOrSearch: this.props.location.state.browseOrSearch,
    // };

    // componentDidMount() {
    //     const searchEndpoint = 'http://localhost:8080/podcat/api/dataResources/' + this.state.id;
    //     fetch(searchEndpoint)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({
    //                 result: data,
    //             });
    //         })
    //         .catch(console.log);
    // }

    name = "Genomic Data Commons"
    description = "NCI’s Genomic Data Commons (GDC) is a data sharing platform that promotes precision medicine in oncology. It is not just a database or a tool; it is an expandable knowledge network supporting the import and standardization of genomic and clinical data from cancer research programs. The GDC contains NCI-generated data from some of the largest and most comprehensive cancer genomic datasets, including The Cancer Genome Atlas (TCGA) and Therapeutically Applicable Research to Generate Effective Therapies (TARGET). For the first time, these datasets have been processed using a common set of bioinformatics pipelines, so that the data can be directly compared."
    url = "https://portal.gdc.cancer.gov/"
    poc = "First Last"
    pocEmail = "first.last@nih.gov"
    type = "Data Commons"
    visualization = "Yes"
    analytics = "Yes"
    contentTypesExists = true
    hasCellLinesData = "No"
    hasClinicalData = "Yes"
    hasImagingData = "Yes"
    hasGenomicsOmics = "Yes"
    hasXenograftData = "Yes"
    api = "https://gdc.cancer.gov/developers/gdc-application-programming-interface-api"


    render() {
        // if (!this.state.result) return '';
        // const result = this.state.result;
        // const contentTypesExists = ((result.hasCellLinesData === "Yes") || 
        //                             (result.hasClinicalData === "Yes") ||
        //                             (result.hasImagingData === "Yes") ||
        //                             (result.hasGenomicsOmics === "Yes") ||
        //                             (result.hasXenograftData === "Yes"));

        return (
            <div className="full-page-container">
                <div className="core-data-layout">
                    {/* <Header/> */}
                    <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb-pad">
                        
                        <Link to="/"  >Home </Link>

                        <Link to="SearchCatalog"  >Search </Link>

                        <Typography color="textPrimary" component="span">
                            {/* {this.name ? parse(this.name) : this.name} */}
                            Dataset Detail: Kids First Data Resource Portal
                        </Typography>
                    </Breadcrumbs>
                    


                    <div key={"Resource 11111"}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={11}>
                                <Typography variant="h5" component="h2" className="buffer" >
                                {this.name ? parse(this.name) : this?.name}
                                </Typography>
                            </Grid> */}
                            {/* {(result.numberOfDigest > 0) && 
                                <Grid item xs={1} className="icon-container">
                                    {(result.autoIngest === "Y") &&
                                        <AutoIngestIcon status={result.ingestStatus}/>}
                                    <Typography align="right" title="Dataset Summaries Available">
                                        <Badge badgeContent={result.numberOfDigest} color="secondary" max={999}>
                                            <LibraryBooksOutlinedIcon/>
                                        </Badge>
                                    </Typography>
                                </Grid>} */}
                        </Grid>

                        {/* {this.url && 
                            <DetailText label="External Link:&nbsp;&nbsp;" 
                                        text={this.url}
                                        isArray={this.url.indexOf(',') > -1 || this.url.indexOf(';') > -1}
                                        isLink={true}/>} */}

                        <Grid container spacing={2} className="buffer">
                            {/* <Grid item xs={7}>
                                <Typography variant="body1" component="p" className="vertical-divider-padding">
                                    {this.description ? parse(this.description) : this.description}

                                </Typography>
                            </Grid> */}
                            <Divider flexItem orientation="vertical" className="vertical-divider"/>
                            <Grid item xs={3}>
                                {/* {result.lastIngestDate && 
                                    <DetailText label="Last Updated" 
                                                text={result.lastIngestDate}
                                                isVertical={true}/>} */}
                                {/* {this.poc &&
                                    <DetailText label="Point of Contact (POC):  " 
                                                text={this.poc}
                                                isVertical={true}/>}
                                {this.pocEmail && 
                                    <DetailText label="POC Email:  " 
                                                text={this.pocEmail}
                                                isLink={this.pocEmail.includes("http")}
                                                isVertical={true}/>} */}
                            </Grid>
                            <Grid item xs={1} className="top-corner-align">
                                <Chip className="margin-buffer mb-2 text-muted" label={this.type?.replace(/_/g," ").toUpperCase()}/>
                            </Grid>
                        </Grid>             
                    </div>
                </div>

                <div className="about-layout-background">
                    <Typography variant="h6" component="h3" fontWeight="fontWeightBold" className="about-layout-heading">
                        <b>About this Resource</b>
                    </Typography>
                    <div className="about-layout-information">
                        <Grid container spacing={3} className="flex-section">
                            <Grid item xs={(6)}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="h6" component="h4">Core Data Elements</Typography>
                                        
                                            
                                            <DetailText label="Case Gender: "
                                                        text={toProperCase("401: Male, 398: Female, 2: Reported Unknown", true)}
                                                        isGrid={true}/>

                                            <DetailText label="Number of Cases: "
                                                        text={toProperCase("801", true)}
                                                        isGrid={true}/>
                                            
                                            <DetailText label="Family Composition: "
                                                        text={toProperCase("615: Trio, 145: Trio+, 24: Other, 17: Duo+", true)}
                                                        isGrid={true}/>

                                            <DetailText label="Sample Normal: "
                                                        text={toProperCase("801: True", true)}
                                                        isGrid={true}/>

                                            <DetailText label="Data Resource Type: "
                                                        text={toProperCase(this.type?.replace(/_/g," "), true)}
                                                        isGrid={true}/>

                                        
                                    </Grid>
                                    {/* <Grid item>
                                        <Typography variant="h6" component="h4">Resource Tools</Typography>
                                        {this.visualization && 
                                            <DetailText label="Visualization Tools"
                                                        text={this.visualization}
                                                        isGrid={true}/>}
                                        {this.analytics && 
                                            <DetailText label="Analytic Tools"
                                                        text={this.analytics}
                                                        isGrid={true}/>}
                                    </Grid>  */}
                                </Grid> 
                            </Grid>
                            
                                {/* <Grid item>
                                    <Grid container direction="column">
                                        <Typography variant="h6" component="h4">Resource Data Content Types</Typography>
                                        {(this.hasCellLinesData === "Yes") && <Typography variant="body1" component="span">Cell Lines Data</Typography>}
                                        {(this.hasClinicalData === "Yes") && <Typography variant="body1" component="span">Clinical Data</Typography>}
                                        {(this.hasImagingData === "Yes") && <Typography variant="body1" component="span">Imaging Data</Typography>}
                                        {(this.hasGenomicsOmics === "Yes") && <Typography variant="body1" component="span">Omics Data</Typography>}
                                        {(this.hasXenograftData === "Yes") && <Typography variant="body1" component="span">Xenograft Data</Typography>}
                                    </Grid>
                                </Grid> */}

                            
                                <Grid item >
                                    <Typography variant="h6" component="h4">Data Access</Typography>
                                        <DetailText label={"API ( External ) : "  + "\u00A0\u00A0"}
                                                    text={this.api}
                                                    isLink={true}/>
                                </Grid>
                        </Grid>

                        {/* style={{ display: "block", padding: 30 }} */}
                                            
                        <Divider style={{padding: 50, background: 'white' }}/>

                       


                        <Divider style={{padding: 50, background: 'white' }}/>



                        {/* {(result.numberOfDigest > 0) && 
                            <DataDigestList result={result} browseOrSearch={this.state.browseOrSearch}/>} */}
                    </div>
                </div>
            </div>
        );
    }
}










// import React from "react";

// const DatasetDetail = () => (
//     <div>
//         Sorry, something went wroooong.
//     </div>
// );

// export default DatasetDetail;

