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


const AdvancedSearch = () => (
    <div>

        
        <h2>Advanced Search</h2>

        {/* <Divider style={{padding: 20, background: 'white' }}/> */}



        <form class="row g-3" style={{margin: 60, background: 'white' }}>

    
            <h5>Research Area </h5>

            <div class="col-md-5">
                <label for="inputState" class="form-label">Cancer Type</label>
                <select id="inputState" class="form-select">
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-5">
                <label for="inputState" class="form-label">Diagnosis</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>

            <div class="col-md-5">
                <label for="inputState" class="form-label">Project Anatomic Site Studied</label>
                <select id="inputState" class="form-select">
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-5">
                <label for="inputState" class="form-label">Case Treatment Studied</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>

            <Divider style={{padding: 10, background: 'white' }}/>

            <h5>Sample Characteristics</h5>

            <div class="col-md-5">
                <label for="inputState" class="form-label">Sample Anatomic Site</label>
                <select id="inputState" class="form-select">
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-5">
                <label for="inputState" class="form-label">Sample Composition Type</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>

            <div class="col-md-5">
                <label for="inputState" class="form-label">Sample Assay Method</label>
                <select id="inputState" class="form-select">
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-5">
                <label for="inputState" class="form-label">Tumor or Normal</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>

            <Divider style={{padding: 10, background: 'white' }}/>

            <h5>Dataset </h5>

            <div class="col-md-5">
                <label for="inputState" class="form-label">Project Name or Title</label>
                <select id="inputState" class="form-select">
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-5">
                <label for="inputState" class="form-label">Author Name</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>

            
            <Divider style={{padding: 10, background: 'white' }}/>

            <h5>Case Demographics </h5>   

            <div class="col-md-3">
                <label for="inputState" class="form-label">Case Sex</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Case Race</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Case Ethnicity</label>
                <select id="inputState" class="form-select" >
                <option selected>Any</option>
                <option>...</option>
                </select>
            </div>


            {/*  

            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4"/>
            </div>

            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4"/>
            </div>

            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
            </div>
            
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
            </div>

             */}



            {/* <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck"/>
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                </div>
            </div> */}

            {/* <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div> */}

        </form>
        
        {/* <Divider style={{padding: 20, background: 'white' }}/>
         */}

        <form class="row g-4" style={{padding: 10, margin: 50, background: 'white' }}>

            <div class="col-md-3">

                <h6>Number of Cases </h6>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        0-10 cases
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                    <label class="form-check-label" for="flexCheckChecked">
                        10-100 cases
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        100-1000 cases
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        &gt; 1000 cases
                    </label>
                </div>

            </div>

            <div class="col-md-3">

                <h6>Case Age at Diagnosis </h6>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        0-1 years
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        1-5 years
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                    <label class="form-check-label" for="flexCheckChecked">
                        5-10 years
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        10-15 years
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        15-20 years
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        20-25 years
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        &gt; 25 years
                    </label>
                </div>

            </div>

        </form>

        
{/* 
        <Divider style={{padding: 20, background: 'white' }}/>
 */}


        <Link to="SearchCatalog" className="btn btn-primary btn-lg" style={{margin: 50 }}>
            
            Search
        </Link>





        <Divider style={{padding: 20, background: 'white' }}/>




        <Divider style={{padding: 20, background: 'white' }}/>


    </div>

    

    
);

export default AdvancedSearch 



