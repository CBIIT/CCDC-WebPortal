import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import HomePage from './home';
import AboutPage from './about';
import Header from "./common/Header";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import PageNotFound from './common/PageNotFound';
import CoursesPage from './courses';
import ManageCoursePage from './courses/ManageCoursePage';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export default function App() {
  return (
    <div className="container-fluid">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Footer />
    </div>
  );
}