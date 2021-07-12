import React from "react";
import {Link} from "react-router-dom";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Tab,
	Tabs,
	Typography,
	AppBar,
	Toolbar,
} from "@material-ui/core";

import "../styles/Search.css";

//import { Breadcrumbs, Link, Typography, Grid } from '@material-ui/core';

const SearchCatalog = () => (
    <div>

        
        <h2>Search Catalog</h2>
        <p>
            This is the search catalog page.
        </p>

        <form>
                {/* <h5 >Search the Catalog</h5> */}
                <input
                    style={{ width: "1000px" }}
                    type="text"
                />
        </form>

        <Divider style={{padding: 10, background: 'white' }}/>

        <Link to="SearchCatalog" className="btn btn-primary btn-md">
            Search
        </Link>

        <Link to="AdvancedSearch" className="adv-home-search-section" style={{padding: 10, margin: 10, background: 'white' }} >
            Advanced Search
        </Link>


        <Divider style={{padding: 40, background: 'white' }}/>




        <form class="row g-4">

            <div class="col-md-3">

                <h4>Filters</h4>
                <Divider style={{padding: 10, background: 'white' }}/>


                {/* <h7>Sort By</h7>
                <select class="form-select" aria-label="Default select example" style={{ width: "200px" }}>
                    <option selected>Data</option>
                    <option value="1">Date</option>
                    <option value="2">Relevance</option>
                    <option value="3">Case #</option>
                </select>

                <Divider style={{padding: 20, background: 'white' }}/> */}

                <h6>Resource </h6>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Kids First
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                    <label class="form-check-label" for="flexCheckChecked">
                        COG
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        St Jude
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                    <label class="form-check-label" for="flexCheckChecked">
                        PEDC
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        dbGap
                    </label>
                </div>

                <Divider style={{padding: 20, background: 'white' }}/>

                <h6>Research Area </h6>
                <div class="w-50 accordion accordion-flush" id="accordionFlushExample" style={{ width: "200px" }}>
                    <div class="accordion-item" style={{ width: "220px" }}>
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Cancer Type
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content </div>
                        </div>
                    </div>
                    <div class="accordion-item" style={{ width: "220px" }}>
                        <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Disease Diagnoses
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <   div class="accordion-body">Placeholder content </div>
                        </div>
                    </div>
                </div>


                <Divider style={{padding: 20, background: 'white' }}/>


            </div>

            <div class="col-md-8">

                <form class="row g-5">
                    <div class="col-md-8">


                        <Card className="info-card">
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    Filters
                                </Typography>

                                <div class="alert alert-light alert-warning alert-dismissible fade show " role="alert">
                                    Filter 1
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                <div class="alert alert-light alert-warning alert-dismissible fade show " role="alert">
                                    Filter 2
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                
                            </CardContent>
                           
                        </Card>

                        

                    </div>

                    <div class="col-md-4">

                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked/>
                            <label class="btn btn-outline-primary btn-sm" for="btnradio1">Table View</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
                            <label class="btn btn-outline-primary btn-sm" for="btnradio2">Card View</label>

                        </div>

                    </div>
                </form>

                


                {/* <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked/>
                    <label class="btn btn-outline-primary btn-sm" for="btnradio1">Table View</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
                    <label class="btn btn-outline-primary btn-sm" for="btnradio2">Card View</label>

                </div> */}


                <Divider style={{padding: 30, background: 'white' }}/>
                
                <form class="row g-5">

                    <div class="col-md-8">
                        <h3>Search Results</h3>
                    </div>

                    <div class="col-md-4">

                    <h7>Sort By</h7>
                    <select class="form-select" aria-label="Default select example" style={{ width: "150px" }}>
                        <option selected>Data</option>
                        <option value="1">Date</option>
                        <option value="2">Relevance</option>
                        <option value="3">Case #</option>
                    </select>

                    </div>
                </form>

                <Divider style={{padding: 10, background: 'white' }}/>


                {/* <h3>Search Results</h3>
                <Divider style={{padding: 10, background: 'white' }}/> */}


                <table class="table" style={{ width: "700px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Project Name</th>
                            <th scope="col">Cases</th>
                            <th scope="col">Data Resource</th>
                            <th scope="col">Molecular Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <th scope="row">Project Sample 1</th> */}
                            <td scope="row"><Link to="DatasetDetail" >Project Sample 1</Link></td>
                            <td>580</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr>
                            <td><Link to="DatasetDetail" >Project Sample 2</Link></td>
                            <td>346</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr>
                            <td><Link to="DatasetDetail" >Project Sample 3</Link></td>
                            <td>70</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                        <tr>
                            <td><Link to="DatasetDetail" >Project Sample 4</Link></td>
                            <td>210</td>
                            <td>COG</td>
                            <td>SRA</td>
                        </tr>
                        <tr>
                            <td><Link to="DatasetDetail" >Project Sample 5</Link></td>
                            <td colspan="1">8</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                    </tbody>
                </table>

                <Divider style={{padding: 20, background: 'white' }}/>


            </div>
                

        </form>

        <Divider style={{padding: 30, background: 'white' }}/>



    </div>
    
);

export default SearchCatalog 

