import React from 'react';
import { Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import LandingPage from './landingPage';
import SearchCatalogPage from './searchCatalogPage';
import AdvancedSearchPage from './advancedSearchPage';
import DatasetDetailPage from './datasetDetailPage';
import ParticipatingResourcesPage from './participatingResourcesPage';
import ParticipatingResourceDetailPage from './participatingResourceDetailPage';
import AboutPage from './aboutPage';
import DocumentSearchPage from './documentSearchPage';
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
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchCatalogPage />} />
        <Route path="/advancedsearch" element={<AdvancedSearchPage />} />
        <Route path="/dataset/:id" element={<DatasetDetailPage />} />
        <Route path="/participatingresources" element={<ParticipatingResourcesPage />} />
        <Route path="/resource/:id" element={<ParticipatingResourceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sitesearch" element={<DocumentSearchPage />} />
        <Route element={<PageNotFound />} />
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Footer />
    </>
  );
}