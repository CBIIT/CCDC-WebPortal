import React from 'react';
import PropTypes from 'prop-types';
import AccordionItem from './AccordionItem';
import './Accordion.css';

const Accordion = ({
  filters,
  fields,
  selection,
  domain,
  onClickSearchFilter,
  onClickParticipatingResourcesSearchFilter,
}) => {
  // const displayCount = domain === "dataset";
  const displayCount = false;
  const clickSearchFilter = domain === "dataset" ? onClickSearchFilter : onClickParticipatingResourcesSearchFilter;

  return (
    <>
      <div className="accordion">
        {fields.map((field, idx) => {
          const str = field.toLowerCase().replaceAll(' ', '_');
          const key = `filters_${idx}`;
          const stayOpenID = `so-${str}-${idx}`;
          const collapseOneID = `co-${str}-${idx}`;
          const defaultCollapsed = "show";
          // const firstAccordionClass = isResource ? "accordion-item-first" : "accordion-item";
          return (
            <div key={key} className="accordion-item">
              <h2 className="accordion-header" id={stayOpenID}>
                <button className={`accordion-button accordion-button-ccdc ${defaultCollapsed ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseOneID}`} aria-expanded={defaultCollapsed ? "true" : "false"} aria-controls={collapseOneID}>
                  {field}
                </button>
              </h2>
              <div id={collapseOneID} className={`accordion-collapse collapse ${defaultCollapsed ? "show" : ""}`} aria-labelledby={stayOpenID}>
                <div className="accordion-body">
                  {
                    filters[idx] && filters[idx].map((item, pos) => {
                      const filterKey = `filter_item_${pos}`;
                      const checked = (selection[str] !== undefined && selection[str].indexOf(item.name) > -1);
                      return (
                        <AccordionItem key={filterKey} name={field} item={item} itemClick={clickSearchFilter} checked={checked} displayCount={displayCount} />
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
  domain: PropTypes.string.isRequired,
  onClickSearchFilter: PropTypes.func.isRequired,
  onClickParticipatingResourcesSearchFilter: PropTypes.func.isRequired,
};

export default Accordion;