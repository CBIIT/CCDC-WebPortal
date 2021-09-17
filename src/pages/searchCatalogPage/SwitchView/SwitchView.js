import React from 'react';
import {Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SwitchView.css';

const SwitchView = ({
  viewType,
  onSwitchView,
}) => {
  const handleSwitchView = (vt) => {
    onSwitchView(vt);
  };

  return (
    <>
      <Nav variant="pills" defaultActiveKey={viewType} className="switch-view-content">
        <Nav.Item onClick={() => handleSwitchView("card")}>
          <Nav.Link eventKey="card">
            <i className="fas fa-th-list" />
            &nbsp;Card View
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => handleSwitchView("table")}>
          <Nav.Link eventKey="table">
            <i className="fas fa-table" />
            &nbsp;Table View
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

SwitchView.propTypes = {
  viewType: PropTypes.string.isRequired,
  onSwitchView: PropTypes.func.isRequired,
};

export default SwitchView;