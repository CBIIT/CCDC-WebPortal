import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import LandingPage from './landingPage';
import SearchPage from './searchPage';
import AdvancedSearchPage from './advancedSearchPage';
import DatasetDetailPage from './datasetDetailPage';
import ParticipatingResourcesPage from './participatingResourcesPage';
import ParticipatingResourceDetailPage from './participatingResourceDetailPage';
import AboutPage from './aboutPage';
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import PageNotFound from '../components/common/PageNotFound';
import CoursesPage from '../components/courses';
import ManageCoursePage from '../components/courses/ManageCoursePage';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/advancedsearch" component={AdvancedSearchPage} />
        <Route path="/dataset/:id" component={DatasetDetailPage} />
        <Route path="/participatingresources" component={ParticipatingResourcesPage} />
        <Route path="/resource/:id" component={ParticipatingResourceDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Footer />
    </>
  );
}