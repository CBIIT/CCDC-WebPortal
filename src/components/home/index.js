import React from 'react';
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className="jumbotron">
            <h1>Welcome to Home Page!</h1>
            <Link to="about" class="btn btn-primary btn-lg">
                Learn more
            </Link>
        </div>
    );
}