import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from './home';
import AboutPage from './about';
import Header from "./common/Header";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import PageNotFound from './common/PageNotFound';
import CoursesPage from './courses';
import ManageCoursePage from './courses/ManageCoursePage';
import SearchCatalogPage from './searchCatalog';
import FeaturedSectionPage from './featuredSection';
import PrimarySectionPage from './primarySection';
import LatestUpdatesPage from './latestUpdates';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export default function App() {
    return (
        <div className="container-fluid">
            <Header></Header>
            <NavBar></NavBar>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/about" component={AboutPage}/>
                <Route path="/courses" component={CoursesPage}/>
                <Route path="/course/:slug" component={ManageCoursePage}/>
                <Route path="/course" component={ManageCoursePage}/>
                <Route path="/searchCatalog" component={SearchCatalogPage}/>
                <Route path="/featuredSection" component={FeaturedSectionPage}/>
                <Route path="/primarySection" component={PrimarySectionPage}/>
                <Route path="/latestUpdates" component={LatestUpdatesPage}/>
                <Route component={PageNotFound}/>
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar/>
            <Footer></Footer>
        </div>
    );
}
