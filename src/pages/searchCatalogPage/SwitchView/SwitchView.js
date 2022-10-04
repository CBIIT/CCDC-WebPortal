import React from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SwitchView.css';
import cardViewIcon from "../../../assets/img/CardView.svg";
import cardViewActiveIcon from "../../../assets/img/CardViewActive.svg";
import tableViewIcon from "../../../assets/img/TableView.svg";
import tableViewActiveIcon from "../../../assets/img/TableViewActive.svg";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, viewType) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("filterByResource")) {
    str += `&filterByResource=${query.get("filterByResource")}`;
  }
  if (query.get("page")) {
    str += `&page=${query.get("page")}`;
  }
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  if (query.get("sortBy")) {
    str += `&sortBy=${query.get("sortBy")}`;
  }
  if (query.get("sortOrder")) {
    str += `&sortOrder=${query.get("sortOrder")}`;
  }
  str += `&viewType=${viewType}`;
  return str.substring(1);
};

const SwitchView = ({
  viewType,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const handleSwitchView = (vt) => {
    const queryStr = replaceQueryStr(query, vt);
    navigate(`/search?${queryStr}`);
  };

  return (
    <>
      <Nav variant="pills" activeKey={viewType} className="switch-view-content">
        <Nav.Item onClick={() => handleSwitchView("card")}>
          <Nav.Link eventKey="card">
            {
              viewType === "card" ? (<img src={cardViewActiveIcon} alt="table-view" />)
              : (
                <img src={cardViewIcon} alt="table-view" />
              )
            }
            Card View
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => handleSwitchView("table")}>
          <Nav.Link eventKey="table">
            {
              viewType === "table" ? (<img src={tableViewActiveIcon} alt="table-view" />)
              : (
                <img src={tableViewIcon} alt="table-view" />
              )
            }
            Table View
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

SwitchView.propTypes = {
  viewType: PropTypes.string.isRequired,
};

export default SwitchView;