import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th> </th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={`/course/${course.slug}`}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={`/course/${course.slug}`}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button type="button" className="btn btn-outline-danger" onClick={() => onDelete(course)}>
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseList;
