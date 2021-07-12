import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./Home";
import AboutPage from "./About";
import Header from "./common/Header";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import PageNotFound from './common/PageNotFound';
import CoursesPage from './courses';
import ManageCoursePage from './courses/ManageCoursePage';
import SearchCatalogPage from './SearchCatalog';
import FeaturedSectionPage from './FeaturedSection';
import ParticipatingResourcesPage from './ParticipatingResources';
import LatestUpdatesPage from './LatestUpdates';
import ResourceDetail from './ResourceDetail';
import DatasetDetail from './DatasetDetail';
import AdvancedSearch from './AdvancedSearch';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

import FilterList from './FilterList';
import Filter from './Filter';

export default function App() {
    return (
        <div className="container-fluid">
            <Header></Header>
            <NavBar></NavBar>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/About" component={AboutPage}/>
                <Route path="/courses" component={CoursesPage}/>
                <Route path="/course/:slug" component={ManageCoursePage}/>
                <Route path="/course" component={ManageCoursePage}/>
                <Route path="/SearchCatalog" component={SearchCatalogPage}/>
                <Route path="/FeaturedSection" component={FeaturedSectionPage}/>
                {/* <Route path="/FeaturedSection" component={FeaturedSection}/> */}
                {/* <Route path="/featuredSection" component={FilterList}/> */}
                <Route path="/ParticipatingResources" component={ParticipatingResourcesPage}/>
                <Route path="/LatestUpdates" component={LatestUpdatesPage}/>
                <Route path="/ResourceDetail" component={ResourceDetail}/>
                <Route path="/DatasetDetail" component={DatasetDetail}/>
                <Route path="/AdvancedSearch" component={AdvancedSearch}/>

                <Route path="/FilterList" component={FilterList}/>
                

                <Route component={PageNotFound}/>
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar/>
            <Footer></Footer>
        </div>
    );
}



/*

talk about
    
    -   quick demo of frontend skeleton and future things to work on 
        and mentioning that dummy data was used for demo 

    -   generic structure of our frontend 

    -   borrowing some components of prototype for creating skeleton

    -   adding test cases during frontend development to 
        ensure code works as intented and functioning correctly 
    
    -   using libraries such as ESLint to make sure code 
        is clean and efficient
        
    -   borrowing reusable code and bootstrap elements to help 
        throughout dev process and easier to work with


*/

