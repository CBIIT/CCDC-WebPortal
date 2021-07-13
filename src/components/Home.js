import React from 'react';
import ReactDOM from 'react-dom';

//import { Divider } from '@material-ui/core';

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

import "../styles/home.css";

export default function HomePage() {
    return (
        <div className="jumbotron">
            <h1>Welcome to Home Page!</h1>

            

            <Link to="About" className="btn btn-primary btn-lg">
                
                Learn more
            </Link>

            <Divider style={{padding: 30, background: 'white' }}/>

            <div className="nav-button">

            
                {/* <h1>Search the Catalog</h1> */}


                <form className="home-search-section">
                    <h3 >Search the Catalog</h3>
                    <input
                        style={{ width: "600px" }}
                        type="text"
                    />
                </form>

                
                {/* Button links to search and adv search page */}

                <Link to="SearchCatalog" className="btn btn-primary btn-sm">
                    Search
                </Link>

                <Link to="AdvancedSearch" className="adv-home-search-section" style={{padding: 10, margin: 10, background: 'white' }} >
                    Advanced Search
                </Link>



            </div>


            {/* List of potential resources being used with links */}

            <h3>Resources</h3>

            <Typography variant="h6" component="h3" align="left">
                Participating Resource 1    <Link to="ParticipatingResources" >Link</Link>
            </Typography>

            <Typography variant="h6" component="h3" align="left">
                Participating Resource 2    <Link to="ParticipatingResources" >Link</Link>    
            </Typography>

            <Typography variant="h6" component="h3" align="left">
                Participating Resource 3    <Link to="ParticipatingResources" >Link</Link>
            </Typography>


            <Divider style={{padding: 30, background: 'white' }}/>


        </div>

        

        
    );


}



// class MyForm extends React.Component {
//     render() {
//         return (
//             <form>
//                 <h1>Hello</h1>
//                 <p>Enter your name:</p>
//                 <input
//                     type="text"
//                 />
//             </form>
//         );
//     }
// }

//ReactDOM.render(<MyForm />, document.getElementById('root'));




// const MyComponent = () => {
//     const [searchQuery, setSearchQuery] = React.useState('');

//     const onChangeSearch = query => setSearchQuery(query);

//     return (
//         <Searchbar
//             placeholder="Search"
//             onChangeText={onChangeSearch}
//             value={searchQuery}
//         />
//     );
// };

// export default MyComponent;

