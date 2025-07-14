import React from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SelectionInput from '../../../components/SelectionInput';
import ascActiveImage from "../../../assets/img/Ascending.Active.svg";
import ascInActiveImage from "../../../assets/img/Ascending.Inactive.svg";
import descActiveImage from "../../../assets/img/Descending.Active.svg";
import descInActiveImage from "../../../assets/img/Descending.Inactive.svg";

const SortingContainer = styled.div`
  display: flex;
  float: left;
`;

const SortingLabel = styled.div`
  line-height: 37.5px;
  padding-right: 10px;
  color: #667985;
  font-size: 13px;
  font-family: Inter;
  font-weight: 600;
`;

const SortingOrderASC = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${ascActiveImage});
  margin-left: 13px;
  cursor: pointer;
`;

const SortingOrderASCInactive = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${ascInActiveImage});
  margin-left: 13px;
  cursor: pointer;
`;

const SortingOrderDESC = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${descActiveImage});
  margin-left: 7px;
  cursor: pointer;
`;

const SortingOrderDESCInactive = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${descInActiveImage});
  margin-left: 7px;
  cursor: pointer;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, sortOrder) => {
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
  str += `&sortOrder=${sortOrder}`;
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
  return str.substring(1);
};

const Sorting = ({
  sort,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const handleASCSorting = () => {
    const queryStr = replaceQueryStr(query, "asc");
    navigate(`/search?${queryStr}`);
  };

  const handleDESCSorting = () => {
    const queryStr = replaceQueryStr(query, "desc");
    navigate(`/search?${queryStr}`);
  };

  return (
    <>
      <SortingContainer>
        <SortingLabel>
          SORT BY
        </SortingLabel>
        <SelectionInput value={sort} items={[{name: "Dataset", k: "dataset_name.raw", v: "asc"}, {name: "Cases", k: "case_id", v: "asc"}, {name: "Samples", k: "sample_id", v: "asc"}, {name: "Resource", k: "data_resource_id", v: "asc"}, {name: "Primary Dataset Scope", k: "primary_dataset_scope", v: "asc"}]} />
      </SortingContainer>
      {
        sort.v === "asc"
        ? (
          <>
            <SortingOrderASC onClick={handleASCSorting} />
            <SortingOrderDESCInactive onClick={handleDESCSorting} />
          </>
          )
        : (
          <>
            <SortingOrderASCInactive onClick={handleASCSorting} />
            <SortingOrderDESC onClick={handleDESCSorting} />
          </>
          )
      }
    </>
  );
};

Sorting.propTypes = {
  sort: PropTypes.object.isRequired,
};

export default Sorting;