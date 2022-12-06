import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Sector
} from 'recharts';

const COLORS_EVEN = [
  '#059268',
  '#1f4c87',
  '#99afbe',
  '#e6c44d',
  '#da6b2e',
  '#0776c6',
];

const COLORS_ODD = [
  '#059268',
  '#1f4c87',
  '#99afbe',
  '#e6c44d',
  '#da6b2e',
  '#0776c6',
];

const DonutChart = ({
    data,
    innerRadiusP,
    outerRadiusP,
    paddingSpace,
    textColor
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      setActiveIndex(0);
    }, [data]);

    const renderActiveShape1 = ({
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value
    }) => {
          return (
              <g>
                  <text
                    x={cx}
                    y={cy}
                    dy="0"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12px"
                    fontWeight="bold"
                    fontFamily="Nunito"
                  >
                      {value}
                  </text>
                  <text
                    x={cx}
                    y={cy}
                    dy="12"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12px"
                    fontWeight="light"
                    fontFamily="Nunito"
                  >
                      {payload.name.length > 20 ? <title>{payload.name}</title> : null}
                      {payload.name.length > 20 ? `${payload.name.substring(0, 20)}...` : payload.name}
                  </text>
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                  />
                  <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 8}
                    fill={fill}
                  />
              </g>
          );
      };

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
      <ResponsiveContainer height={255} width="100%">
        <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape1}
              data={data}
              textColor={textColor}
              innerRadius={innerRadiusP}
              outerRadius={outerRadiusP}
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationBegin={100}
              paddingAngle={paddingSpace}
            >
                {
                    data.map((entry, index) => {
                        const key = "cell-".concat(index);
                        const fill = data.length % 2 === 0 ? COLORS_EVEN[index % COLORS_EVEN.length] : COLORS_ODD[index % COLORS_ODD.length];
                        return <Cell key={key} fill={fill} textColor={textColor} />;
                    })
                }
            </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
};

DonutChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    innerRadiusP: PropTypes.number.isRequired,
    outerRadiusP: PropTypes.number.isRequired,
    paddingSpace: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired
};

export default DonutChart;