import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-bootstrap/Collapse';
import AccordionItem from './AccordionItem';
import './Accordion.css';

const Accordion = ({
  filters,
  fields,
  selection,
}) => {
  const displayCount = false;
  const [open, setOpen] = useState(fields.map(() => true));

  const handleClick = (idx) => {
    const newOpen = Object.assign([], open);
    newOpen[idx] = !newOpen[idx];
    setOpen(newOpen);
  };

  return (
    <>
      <div className="accordion">
        {fields.map((field, idx) => {
          const str = field.toLowerCase().replaceAll(' ', '_');
          const key = `filters_${idx}`;
          // const firstAccordionClass = isResource ? "accordion-item-first" : "accordion-item";
          return (
            <div key={key} className="accordion-item">
              <h2 className="accordion-header">
                <button type="button" style={{color: '#6B7276'}} onClick={() => handleClick(idx)} className={`accordion-button accordion-button-ccdc ${open[idx] ? "" : "collapsed"}`}>
                  {field}
                </button>
              </h2>
              <Collapse in={open[idx]}>
                <div className="accordion-body">
                  {
                    filters[idx] && filters[idx].map((item, pos) => {
                      const filterKey = `filter_item_${pos}`;
                      const checked = (selection[str] !== undefined && selection[str].indexOf(item.name) > -1);
                      return (
                        <AccordionItem key={filterKey} name={field} item={item} checked={checked} displayCount={displayCount} />
                      );
                    })
                  }
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>
    </>
  );
};

Accordion.propTypes = {
  filters: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  selection: PropTypes.object.isRequired,
};

export default Accordion;