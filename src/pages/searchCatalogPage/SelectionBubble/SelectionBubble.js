import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BubbleContainer = styled.div`
  border-radius: 20px;
  background-color: #e8f1f8;
  color: #4b6a90;
  border: 1px solid gold;
  padding: 0 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  float: left;

  .removeBubble {
    margin-left: 10px;
  }

  .removeBubble:hover {
    color: #07368b;
    cursor: pointer;
  }
`;

const SelectionBubble = ({
  selections,
  onBubbleRemoveClick,
}) => {
  const bubbles = [];

  if (selections.search_text !== "") {
    bubbles.push({field: "search_text", value: selections.search_text});
  }
  if (Object.keys(selections.facet_filters).length > 0) {
    Object.keys(selections.facet_filters).map((field) => {
      return selections.facet_filters[field].map((ffilter) => {
        return bubbles.push({
          field,
          value: ffilter,
        });
      });
    });
  }

  const handleBubbleRemoveClick = (bubble) => {
    onBubbleRemoveClick(bubble);
  };

  return (
    <>
      {
        bubbles.map((b, idx) => {
          const key = `bubble_${idx}`;
          return (
            <BubbleContainer key={key}>
              {b.field}
              :&nbsp;
              {b.value}
              <span className="removeBubble" onClick={() => handleBubbleRemoveClick(b)} aria-hidden="true">
                <i className="fas fa-times" />
              </span>
            </BubbleContainer>
          );
        })
      }
    </>
  );
};

SelectionBubble.propTypes = {
  selections: PropTypes.object.isRequired,
  onBubbleRemoveClick: PropTypes.func.isRequired,
};

export default SelectionBubble;