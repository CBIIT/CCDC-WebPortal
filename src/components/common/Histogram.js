import React from "react";
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar
} from 'recharts';

const Histogram = ({
    data
}) => {
    return (
      <ResponsiveContainer height={300} width="100%">
        <BarChart width={350} height={250} maxBarSize={80} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00a272" />
        </BarChart>
      </ResponsiveContainer>
    );
};

Histogram.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Histogram;