import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Label
} from 'recharts';

const Histogram = ({
    data
}) => {
    const [newData, setNewData] = useState([]);
    useEffect(() => {
      const newArr = [];
      for (let i = 0; i < data.length; i += 1) {
        const newItem = {};
        if (data[i].name.includes("<40")) {
          newItem.name = "<40";
        } else if (data[i].name.toUpperCase().includes("GREATER")) {
          newItem.name = ">39";
        } else {
          newItem.name = data[i].name.replace("years", "").trim();
        }
        newItem.Cases = data[i].value;
        newArr.push(newItem);
      }
      setNewData(newArr);
    }, [data]);
    return (
      <ResponsiveContainer height={300} width="100%">
        <BarChart
          width={350}
          height={290}
          maxBarSize={80}
          data={newData}
          margin={{left: 10, bottom: 20}}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{fontSize: 13}}>
              <Label value="Age (Years)" fill="#666" offset={-15} position="insideBottom" />
            </XAxis>
            <YAxis tick={{fontSize: 13}}>
              <Label value="Cases" fill="#666" offset={-3} angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Bar dataKey="Cases" fill="#00a272" />
        </BarChart>
      </ResponsiveContainer>
    );
};

Histogram.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Histogram;