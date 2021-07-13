
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

import Header from "./common/Header";
//import { DataDigestList } from "./DataDigestList";
import DetailText from "./DetailText";
import AutoIngestIcon from "./AutoIngestIcon";
import history from "../utilities/history";
import { toProperCase } from "../utilities/toProperCase";
import parse from "html-react-parser";

export default class DatasetDetail extends Component {

    // sample data for dataset detail demo 

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
                           
        return (
            <div className="full-page-container">
                <div className="core-data-layout">
                    {/* <Header/> */}

                    {/* breadcrum links for dataset detail */}
                    <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb-pad">
                        
                        <Link to="/"  >Home </Link>

                        <Link to="SearchCatalog"  >Search </Link>

                        <Typography color="textPrimary" component="span">
                            Dataset Detail: Kids First Data Resource Portal
                        </Typography>
                    </Breadcrumbs>
                    


                    <div key={"Resource 11111"}>
                        <Grid container spacing={2}>
     
                        </Grid>


                        <Grid container spacing={2} className="buffer">
                            
                            <Divider flexItem orientation="vertical" className="vertical-divider"/>
                            <Grid item xs={3}>
                                
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
                                   
                                </Grid> 
                            </Grid>
                            
                            
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


