import React , { Component } from "react";

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


export default class AboutPage extends Component{

    render() {

        return (

            <div>
                <h2>About</h2>
                <p>
                    This app uses React, Redux, React Router, and may other helpful libraries.
                </p>

                {/* <button type="button" class="btn btn-secondary">Secondary</button>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div> 

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>  */}



        
            </div>

    
            
        );

    }

    


}






// const AboutPage = () => (
    // <div>
    //     <h2>About</h2>
    //     <p>
    //         This app uses React, Redux, React Router, and may other helpful libraries.
    //     </p>
        
        
    // </div>
// );

// export default AboutPage;