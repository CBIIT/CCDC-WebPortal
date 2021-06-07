import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';
import { toast } from "react-toastify";

const CoursesPage = ({courses, actions}) =>{
    const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

    useEffect(() => {
        if(courses.length == 0){
            actions.courses.loadCourses().catch(error => {
                console.log("Loading courses failed" + error);
            });

            actions.authors.loadAuthors().catch(error => {
                console.log("Loading authors failed" + error);
            });
        }
        
    }, []);

    function gotoAddCourse(){
        setRedirectToAddCoursePage(true);
    }

    function handleDelete(course){
        toast.success("Delete Successful.");
        actions.courses.deleteCourse(course).catch(error => {
            toast.error("Delete failed.", error);
        });
    }

    return (
        <>
            {redirectToAddCoursePage && <Redirect to="/course" />}
            <h2>Courses List:</h2>
            <button style={{marginBottom: 20}} className="btn btn-primary add-course" 
            onClick={gotoAddCourse}>Add Course</button>
            <CourseList courses={courses} onDelete={handleDelete} />
        </>
    );
};

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.authors.length == 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id == course.authorId).name
            }
        })
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:{
            courses: bindActionCreators(courseActions, dispatch),
            authors: bindActionCreators(authorActions, dispatch)
        } 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);