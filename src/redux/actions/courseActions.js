import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

function deleteCourseOptimistic(course) {
    return {type: types.DELETE_COURSE_OPTIMISTIC, course};
}

export function loadCourses() {
    return function(dispatch) {
        return courseApi.getCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        })
        .catch(error => {
            throw error;
        });
    };
}

export function saveCourse(course) {
    return function(dispatch) {
        return courseApi.saveCourse(course)
        .then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse))
             : dispatch(createCourseSuccess(savedCourse));
        })
        .catch(error => {
            throw error;
        });
    };
}

export function deleteCourse(course) {
    return function(dispatch) {
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    };
}