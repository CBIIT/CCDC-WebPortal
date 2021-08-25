import React from "react";
import {
    Link,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
// import { Card, CardContent } from '@material-ui/core';
import './searchPage.css';

/* eslint-disable */
const SearchPage = () => (
    <div className="searchPageContainer">

        <Button className="exportButton">
            Export
        </Button>

        <h2 className="searchHeader">Search Results</h2>

        <input type="text" className="searchBar" placeholder="  Search the Catalog " />

        <Link to="/search">
            <Button className="searchPageSearchButton">
                Search
            </Button>
        </Link>

        <form className="space20">
        </form>

        <Link to="/advancedsearch" className="adv-home-search-section" style={{padding: 10, margin: 10, background: 'white' }}>
            Advanced Search
        </Link>

        <form className="space40">
            {/* space */}
        </form>

        <form className="row g-4">

            <div className="col-md-3">

                {/* Example filters option on left side panel */}
                {/* <h4>Filters</h4> */}
                <form className="space10">
                    {/* space */}
                </form>

                {/* <Card className="info-card">
                    <CardContent className="chosenFilters">
                        <h4 variant="h6" component="h2">
                            Filters
                        </h4>

                        <div className="alert alert-light alert-warning alert-dismissible fade show " role="alert">
                            Filter 1
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <div className="alert alert-light alert-warning alert-dismissible fade show " role="alert">
                            Filter 2
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    </CardContent>

                </Card> */}

                {/* <h7>Sort By</h7>
                <select class="form-select" aria-label="Default select example" style={{ width: "200px" }}>
                    <option selected>Data</option>
                    <option value="1">Date</option>
                    <option value="2">Relevance</option>
                    <option value="3">Case #</option>
                </select>

                {/* eslint-disable */}

                <h6 style={{color: 'navy', fontSize: '150%'}}>Resource </h6>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Kids First
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        COG
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        St Jude
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        PEDC
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        dbGap
                    </label>
                </div>

                <form className="space20">
                    {/* space */}
                </form>

                <h6>Research Area </h6>
                <div className="w-50 accordion accordion-flush" id="accordionFlushExample" style={{ width: "200px" }}>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Cancer Type
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Disease Diagnoses
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content </div>
                        </div>
                    </div>
                </div>

                <form className="space20">
                    {/* space */}
                </form>

            </div>

            <div className="col-md-8">

                <form className="row g-5">
                    <div className="col-md-8">

                        {/* Card view list of selected filters being applied in search */}
                        {/* <Card className="info-card">
                            <CardContent>
                                <h6 variant="h6" component="h2">
                                    Filters
                                </h6>

                                <div className="alert alert-light alert-warning alert-dismissible fade show " role="alert">
                                    Filter 1
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                <div className="alert alert-light alert-warning alert-dismissible fade show " role="alert">
                                    Filter 2
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                            </CardContent>

                        </Card> */}

                    </div>

                    <div className="col-md-4">

                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
                            <label className="btn btn-outline-primary btn-sm" htmlFor="btnradio1">Table View</label>

                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                            <label className="btn btn-outline-primary btn-sm" htmlFor="btnradio2">Card View</label>

                        </div>

                    </div>
                </form>

                <form className="space20">
                    {/* space */}
                </form>

                <form className="row g-5">

                    {/* <div className="col-md-8">
                        <h3>Search Results</h3>
                    </div> */}

                    <div className="col-md-4">

                        <h7>Sort By</h7>
                        <select className="form-select" aria-label="Default select example" style={{ width: "150px" }}>
                            <option selected>Data</option>
                            <option value="1">Date</option>
                            <option value="2">Relevance</option>
                            <option value="3">Case #</option>
                        </select>

                    </div>
                    
                </form>

                <form className="space20">
                    {/* space */}
                </form>

                {/* Search results list sample in table view */}
                <table className="table" style={{ width: "700px" }}>
                    <thead>
                        <tr style={{color: 'navy' }}>
                            <th scope="col">Project Name</th>
                            <th scope="col">Cases</th>
                            <th scope="col">Data Resource</th>
                            <th scope="col">Molecular Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <th scope="row">Project Sample 1</th> */}
                            {/* <td scope="row"><Link to="DatasetDetail">Project Sample 1</Link></td> */}
                            <td><Link to="/dataset/:id">Project Sample 1</Link></td>
                            <td>580</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr>
                            <td><Link to="/dataset/:id">Project Sample 2</Link></td>
                            <td>346</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr>
                            <td><Link to="/dataset/:id">Project Sample 3</Link></td>
                            <td>70</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                        <tr>
                            <td><Link to="/dataset/:id">Project Sample 4</Link></td>
                            <td>210</td>
                            <td>COG</td>
                            <td>SRA</td>
                        </tr>
                        <tr>
                            <td><Link to="/dataset/:id">Project Sample 5</Link></td>
                            <td colSpan="1">8</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                    </tbody>
                </table>

                <form className="space40">
                    {/* space */}
                </form>

                <form className="row" style={{ marginLeft: "280px" }}>
                    <div className="col-md-4">
                        <p style={{ fontSize: "90%" }}>Showing 1-25 of 30 </p>
                    </div>
                    <div className="col-md-2">
                        <div class="searchPagination">
                            <div class="pagination">
                            {/* <a href="#">&laquo;</a> */}
                            <a href="#">Previous</a>
                            <a class="active" href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#">Next</a>
                            {/* <a href="#">&raquo;</a> */}
                            </div>
                        </div>
                    </div>
                </form>

                {/* <form className="row g-4">
                    <div className="col-md-4">
                        <p>Showing 1-25 of 30 </p>
                    </div>
                    <div className="col">
                        <p>Showing 1-25 of 30 </p>
                    </div>
                </form> */}

            </div>

        </form>

        <form className="space40">
            {/* space */}
        </form>

    </div>
);

export default SearchPage;

/* eslint-disable */
/* eslint-enable */