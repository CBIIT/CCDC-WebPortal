import React from "react";
import {
    Link,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import "bootstrap";
import './searchPage.css';

// class Filter extends React.Component {
//     _isMounted = false;

//     state = {
//         searchFilters: [],
//         searchResults: {},
//         // checkboxes: []
//     }

//     componentDidMount() {
//         this.isMounted = true;
//     }

//     componentWillUnmount() {
//         this.isMounted = false;
//     }

//     handleQueryChange = (searchResultsList) => {
//         if (this.isMounted) {
//             this.setState({
//                 searchFilters: [],
//                 searchResults: searchResultsList,
//             });
//         }
//     };
// }
const SearchPage = () => (

    <div className="searchPageContainer">

        <h2 className="searchHeader">Search Results</h2>

        <input type="text" className="searchBar" placeholder="  Search the Catalog " />

        <Link to="/search">
            <Button className="searchPageSearchButton">
                Search
            </Button>
        </Link>

        <Button className="exportButton">
            Export
        </Button>

        <div className="space10" />
        {/* <Link to="/advancedsearch" className="adv-home-search-section" style={{padding: 10, margin: 10, background: 'white' }}>
            Advanced Search
        </Link> */}

        <Link to="/advancedsearch" className="headerLink">
            <Button className="buttonText" style={{ color: 'navy', marginTop: "-30px" }}>
                <h6>
                    &nbsp;Advanced Search &emsp;
                    <span style={{ color: 'navy' }}>&#9658;</span>
                </h6>
            </Button>
        </Link>

        <div className="space20" />
        <div className="separater1" />

        <form className="row g-4">

            <div className="col-md-3" style={{ width: "260px", borderRight: "2px solid lightgray" }}>

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

                {/* <div className="alert alert-success alert-dismissible" role="alert">
                    <span className="xtext">Cases: 0-1000</span>
                    <button className="btn close" type="button" data-dismiss="alert" aria-label="Close">
                        <span className="xclose" aria-hidden="true">×</span>
                    </button>
                </div> */}
                <button className="xbtn2 alert-dismissible" type="button">
                    <span className="xtext">Cancer Type: Kidney</span>
                    <button className="btn close2" type="button" data-dismiss="alert" aria-label="Close">
                        <span className="xclose" aria-hidden="true">×</span>
                    </button>
                </button>
                <button className="xbtn alert-dismissible" type="button">
                    <span className="xtext">Cases: 0-1000</span>
                    <button className="btn close" type="button" data-dismiss="alert" aria-label="Close">
                        <span className="xclose" aria-hidden="true">×</span>
                    </button>
                </button>

                <div className="space20" />
                <div className="separater3" />

                <h6 style={{ fontSize: '100%' }}>Resource </h6>
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

                <div className="space10" />
                <div className="separater3" />

                <h6 className="filterHeader">Research Area </h6>
                <div className="w-50 accordion accordion-flush" id="accordionFlushExample" style={{ width: "200px" }}>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading1">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="false" aria-controls="flush-collapse1">
                                Cancer Type
                            </button>
                        </h2>
                        <div id="flush-collapse1" className="accordion-collapse collapse" aria-labelledby="flush-heading1" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion1check1" />
                                    <label className="form-check-label" htmlFor="accordion1check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion1check2" />
                                    <label className="form-check-label" htmlFor="accordion1check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading2">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2" aria-expanded="false" aria-controls="flush-collapse2">
                                Disease Diagnoses
                            </button>
                        </h2>
                        <div id="flush-collapse2" className="accordion-collapse collapse" aria-labelledby="flush-heading2" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion2check1" />
                                    <label className="form-check-label" htmlFor="accordion2check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion2check2" />
                                    <label className="form-check-label" htmlFor="accordion2check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading3">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3" aria-expanded="false" aria-controls="flush-collapse3">
                                Anatomic Site Studied
                            </button>
                        </h2>
                        <div id="flush-collapse3" className="accordion-collapse collapse" aria-labelledby="flush-heading3" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion3check1" />
                                    <label className="form-check-label" htmlFor="accordion3check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion3check2" />
                                    <label className="form-check-label" htmlFor="accordion3check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="separater3" />

                <h6 className="filterHeader">Biospecimen </h6>
                <div className="w-50 accordion accordion-flush" id="accordionFlushExample" style={{ width: "200px" }}>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading4">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapse4">
                                Sample Anatomic Site
                            </button>
                        </h2>
                        <div id="flush-collapse4" className="accordion-collapse collapse" aria-labelledby="flush-heading4" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion4check1" />
                                    <label className="form-check-label" htmlFor="accordion4check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion4check2" />
                                    <label className="form-check-label" htmlFor="accordion4check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading5">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse5" aria-expanded="false" aria-controls="flush-collapse5">
                                Sample Assay Type
                            </button>
                        </h2>
                        <div id="flush-collapse5" className="accordion-collapse collapse" aria-labelledby="flush-heading5" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion5check1" />
                                    <label className="form-check-label" htmlFor="accordion5check1">
                                        WGS
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion5check2" />
                                    <label className="form-check-label" htmlFor="accordion5check2">
                                        WXS
                                    </label>
                                </div>
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion5check3" />
                                    <label className="form-check-label" htmlFor="accordion5check3">
                                        Targeted
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion5check4" />
                                    <label className="form-check-label" htmlFor="accordion5check4">
                                        RNASeq
                                    </label>
                                </div>
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion5check5" />
                                    <label className="form-check-label" htmlFor="accordion5check5">
                                        MicroArray
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion5check6" />
                                    <label className="form-check-label" htmlFor="accordion5check6">
                                        Miceosatellite
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading6">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse6" aria-expanded="false" aria-controls="flush-collapse6">
                                Sample Repository Name
                            </button>
                        </h2>
                        <div id="flush-collapse6" className="accordion-collapse collapse" aria-labelledby="flush-heading6" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion6check1" />
                                    <label className="form-check-label" htmlFor="accordion6check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion6check2" />
                                    <label className="form-check-label" htmlFor="accordion6check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading7">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse7" aria-expanded="false" aria-controls="flush-collapse7">
                                Disease Diagnoses
                            </button>
                        </h2>
                        <div id="flush-collapse7" className="accordion-collapse collapse" aria-labelledby="flush-heading7" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion7check1" />
                                    <label className="form-check-label" htmlFor="accordion7check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion7check2" />
                                    <label className="form-check-label" htmlFor="accordion7check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="separater3" />

                <h6 className="filterHeader">Case Demographic </h6>
                <div className="w-50 accordion accordion-flush" id="accordionFlushExample" style={{ width: "200px" }}>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading8">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse8" aria-expanded="false" aria-controls="flush-collapse8">
                                Case Age
                            </button>
                        </h2>
                        <div id="flush-collapse8" className="accordion-collapse collapse" aria-labelledby="flush-heading8" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion8check1" />
                                    <label className="form-check-label" htmlFor="accordion8check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion8check2" />
                                    <label className="form-check-label" htmlFor="accordion8check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading9">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse9" aria-expanded="false" aria-controls="flush-collapse9">
                                Case Ethnicity
                            </button>
                        </h2>
                        <div id="flush-collapse9" className="accordion-collapse collapse" aria-labelledby="flush-heading9" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion9check1" />
                                    <label className="form-check-label" htmlFor="accordion9check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion9check2" />
                                    <label className="form-check-label" htmlFor="accordion9check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading10">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse10" aria-expanded="false" aria-controls="flush-collapse10">
                                Case Race
                            </button>
                        </h2>
                        <div id="flush-collapse10" className="accordion-collapse collapse" aria-labelledby="flush-heading10" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion10check1" />
                                    <label className="form-check-label" htmlFor="accordion10check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion10check2" />
                                    <label className="form-check-label" htmlFor="accordion10check2">
                                        Option 2
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ width: "220px" }}>
                        <h2 className="accordion-header" id="flush-heading11">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse11" aria-expanded="false" aria-controls="flush-collapse11">
                                Case Sex
                            </button>
                        </h2>
                        <div id="flush-collapse11" className="accordion-collapse collapse" aria-labelledby="flush-heading11" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="form-check" style={{ backgroundColor: "#E2E2E2" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="accordion11check1" />
                                    <label className="form-check-label" htmlFor="accordion11check1">
                                        Option 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="accordion11check2" />
                                    <label className="form-check-label" htmlFor="accordion11check2">
                                        Option 2
                                        this.state.searchFilters.data.name
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="space20">
                    {/* space */}
                </form>

                {/* <div class="filterAccordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                options
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                options
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                option 3
                            </div>
                        </div>
                    </div>
                </div> */}

                <form className="space20">
                    {/* space */}
                </form>

            </div>

            <div className="col-md-8" style={{ marginLeft: "10px", width: "770px" }}>

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
                </form>

                <form className="space20">
                    {/* space */}
                </form>

                <form className="row g-5">

                    <div className="col-md-4">

                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ marginBottom: "-40px" }}>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                            <label className="btn btn-outline-primary btn-sm" htmlFor="btnradio1" style={{ color: "black", borderColor: "white" }}>
                                <i className="fas fa-table" />
                                &nbsp;Table View
                            </label>

                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                            <label className="btn btn-outline-primary btn-sm" htmlFor="btnradio2" style={{ color: "black", borderColor: "white" }}>
                                <i className="fas fa-th-list" />
                                &nbsp; Card View
                            </label>
                        </div>

                    </div>

                    <div className="col-md-4" style={{ fontSize: "80%", marginBottom: "-10px" }}>
                        <h7>Sort By</h7>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Date</option>
                            <option value="1">Date</option>
                            <option value="2">Relevance</option>
                            <option value="3">Case #</option>
                        </select>
                    </div>

                    <div className="row" style={{ marginLeft: "480px", float: "right" }}>
                        <div className="col-md-4" style={{ marginRight: "-115px", fontSize: "90%" }}>
                            <p>Showing 1-25 of 30 </p>
                        </div>
                        <div className="col-md-2">
                            <div className="searchPagination">
                                <div className="pagination">
                                    {/* <a href="#">&laquo;</a> */}
                                    <a href="#">Previous</a>
                                    {/* <a class="active" href="#">1</a> */}
                                    <a href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <a href="#">4</a>
                                    <a href="#">5</a>
                                    <a href="#">Next</a>
                                    {/* <a href="#">&raquo;</a> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

                <div className="space10" />

                <div className="separater2" />

                {/* Search results list sample in table view */}
                <table className="table" style={{ width: "800px" }}>
                    <thead>
                        <tr style={{ color: 'navy' }}>
                            <th scope="col">Project Name</th>
                            <th scope="col">Cases</th>
                            <th scope="col">Data Resource</th>
                            <th scope="col">Molecular Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ backgroundColor: "#E2E2E2" }}>
                            <td><Link to="/dataset/:id">Project Sample 1</Link></td>
                            <td>580</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr style={{ backgroundColor: "#DAEEF4" }}>
                            <td><Link to="/dataset/:id">Project Sample 2</Link></td>
                            <td>346</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr style={{ backgroundColor: "lightyellow" }}>
                            <td><Link to="/dataset/:id">Project Sample 3</Link></td>
                            <td>70</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                        <tr style={{ backgroundColor: "#E2E2E2" }}>
                            <td><Link to="/dataset/:id">Project Sample 4</Link></td>
                            <td>210</td>
                            <td>COG</td>
                            <td>SRA</td>
                        </tr>
                        <tr style={{ backgroundColor: "#DAEEF4" }}>
                            <td><Link to="/dataset/:id">Project Sample 5</Link></td>
                            <td colSpan="1">8</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                        <tr style={{ backgroundColor: "lightyellow" }}>
                            <td><Link to="/dataset/:id">Project Sample 6</Link></td>
                            <td>580</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr style={{ backgroundColor: "#E2E2E2" }}>
                            <td><Link to="/dataset/:id">Project Sample 7</Link></td>
                            <td>346</td>
                            <td>COG</td>
                            <td>PEDC</td>
                        </tr>
                        <tr style={{ backgroundColor: "#DAEEF4" }}>
                            <td><Link to="/dataset/:id">Project Sample 8</Link></td>
                            <td>70</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                        <tr style={{ backgroundColor: "lightyellow" }}>
                            <td><Link to="/dataset/:id">Project Sample 9</Link></td>
                            <td>210</td>
                            <td>COG</td>
                            <td>SRA</td>
                        </tr>
                        <tr style={{ backgroundColor: "#E2E2E2" }}>
                            <td><Link to="/dataset/:id">Project Sample 10</Link></td>
                            <td colSpan="1">8</td>
                            <td>PEDC</td>
                            <td>SRA</td>
                        </tr>
                    </tbody>
                </table>

                {/* <div className="space10" />
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 1</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 2</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 3</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 4</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 5</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div> */}

                {/* <div className="space10" /> */}
                <div className="separater2" style={{ marginTop: "-8px" }} />
                <div className="space20" />

                <form className="row" style={{ marginLeft: "00px", float: "right" }}>
                    <div className="col-md-7" style={{ marginLeft: "70px", marginRight: "-70px", fontSize: "90%" }}>
                        <p>Showing 1-25 of 30 </p>
                    </div>
                    <div className="col-md-2">
                        <div className="searchPagination">
                            <div className="pagination">
                                {/* <a href="#">&laquo;</a> */}
                                <a href="#">Previous</a>
                                {/* <a class="active" href="#">1</a> */}
                                <a href="#">1</a>
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

                {/* <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 1</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 2</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 3</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 4</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to="/dataset/:id">Project Sample 5</Link>
                        </h5>
                        <p className="card-text">search results keywords and description and dataset detail content </p>
                    </div>
                </div> */}
                {/* <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
                        <a href="/dataset/:id" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div> */}

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
// { /* eslint-enable */}
