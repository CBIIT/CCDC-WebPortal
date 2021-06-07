import React from 'react';
import CourseForm from '../CourseForm';
import {cleanup, render} from '@testing-library/react';

afterEach(cleanup);

function renderCourseForm(args){
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };
    const props = {...defaultProps, ...args};
    return render(<CourseForm {...props} />);
}

it("should render Add Course", () => {
    const {getByText} = renderCourseForm();
    getByText("Add Course");
});

it("should label save button", () => {
    const {getByText} = renderCourseForm();
    getByText("Save");
});

