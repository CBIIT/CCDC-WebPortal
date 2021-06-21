import React from 'react';
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className="jumbotron">
            <h1>Welcome to Home Page!</h1>
            <Link to="about" className="btn btn-primary btn-lg">
                Learn more
            </Link>

            <div className="nav-button">
            <h1>Search the Catalog</h1>
            <Link to="searchCatalog" className="btn btn-primary btn-lg">
                Search
            </Link>


            </div>



        </div>
    );
}



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

