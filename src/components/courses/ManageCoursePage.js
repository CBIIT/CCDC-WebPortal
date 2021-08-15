import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadCourses, saveCourse} from "../../redux/actions/courseActions";
import {loadAuthors} from "../../redux/actions/authorActions";
import CourseForm from './CourseForm';

const ManageCoursesPage = ({
    courses, authors, onLoadCourses, onSaveCourse, onLoadAuthors, history, ...prop
}) => {
    const [course, setCourse] = useState({...prop.course});
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            onLoadCourses().catch(error => {
                console.log(`Loading courses failed ${error}`);
            });
        } else {
            setCourse({...prop.course});
        }

        if (authors.length === 0) {
            onLoadAuthors().catch(error => {
                console.log(`Loading authors failed ${error}`);
            });
        }
    }, [prop.course]);

    function handleChange(event) {
        const {name, value} = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    function handleSave(event) {
        event.preventDefault();
        onSaveCourse(course).then(() => {
            history.push("/courses");
        });
    }

    return (
        <CourseForm course={course} errors={{}} authors={authors} onChange={handleChange} onSave={handleSave} />
    );
};

ManageCoursesPage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    onLoadCourses: PropTypes.func.isRequired,
    onLoadAuthors: PropTypes.func.isRequired,
    onSaveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const {slug} = ownProps.match.params;
    const newCourse = {
        id: null,
        title: "",
        authorId: null,
        category: ""
      };
    const course = slug ? state.courses.find(cs => cs.slug === slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    onLoadCourses: loadCourses,
    onLoadAuthors: loadAuthors,
    onSaveCourse: saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);