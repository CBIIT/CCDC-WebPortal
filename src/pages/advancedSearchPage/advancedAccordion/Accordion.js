import React from 'react';
import PropTypes from 'prop-types';
import AccordionItem from './AccordionItem';
import './advancedAccordion.css';

const Accordion = ({
  filters,
  fields,
  selection,
  onClickSearchFilter,
}) => {
  return (
    <>
      <div className="accordion">
        {fields.map((field, idx) => {
          const str = field.replaceAll(' ', '_');
          const key = `filters_${idx}`;
          const stayOpenID = `so-${str}-${idx}`;
          const collapseOneID = `co-${str}-${idx}`;
          const isResource = field === "Resource";
          const firstAccordionClass = isResource ? "accordion-item-first" : "accordion-item";
          return (
            <div key={key} className={firstAccordionClass}>
              <h2 className="accordion-header" id={stayOpenID}>
                <button className={`accordion-button accordion-button-ccdc ${isResource ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseOneID}`} aria-expanded={isResource ? "true" : "false"} aria-controls={collapseOneID}>
                  {field}
                </button>
              </h2>
              <div id={collapseOneID} className={`accordion-collapse collapse ${isResource ? "show" : ""}`} aria-labelledby={stayOpenID}>
                <div className="accordion-body">
                  {
                    filters[idx] && filters[idx].map((item, pos) => {
                      const filterKey = `filter_item_${pos}`;
                      const checked = (selection[field] !== undefined && selection[field].indexOf(item) > -1);
                      return (
                        <AccordionItem key={filterKey} name={field} value={item} itemClick={onClickSearchFilter} checked={checked} />
                      );
                    })
                  }
                </div>
              </div>
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
  onClickSearchFilter: PropTypes.func.isRequired,
};

export default Accordion;