import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import LandingPage from './landingPage';
import SearchCatalogPage from './searchCatalogPage';
import AdvancedSearchPage from './advancedSearchPage';
import DatasetDetailPage from './datasetDetailPage';
import ParticipatingResourcesPage from './participatingResourcesPage';
import ParticipatingResourceDetailPage from './participatingResourceDetailPage';
import AboutPage from './aboutPage';
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import PageNotFound from '../components/common/PageNotFound';
import "react-toastify/dist/ReactToastify.css";
import '../index.css';

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/search" component={SearchCatalogPage} />
        <Route path="/advancedsearch" component={AdvancedSearchPage} />
        <Route path="/dataset/:id" component={DatasetDetailPage} />
        <Route path="/participatingresources" component={ParticipatingResourcesPage} />
        <Route path="/resource/:id" component={ParticipatingResourceDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Footer />
    </>
  );
}