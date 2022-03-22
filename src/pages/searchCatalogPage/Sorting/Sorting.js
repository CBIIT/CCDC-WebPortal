import React from 'react';
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
  color: #748895;
  font-size: 13px;
  font-family: Inter;
  font-weight: 600;
`;

const SortingOrderASC = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${ascActiveImage});
  margin-left: 5px;
  cursor: pointer;
`;

const SortingOrderASCInactive = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${ascInActiveImage});
  margin-left: 5px;
  cursor: pointer;
`;

const SortingOrderDESC = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${descActiveImage});
  margin-left: 5px;
  cursor: pointer;
`;

const SortingOrderDESCInactive = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${descInActiveImage});
  margin-left: 5px;
  cursor: pointer;
`;

const Sorting = ({
  sort,
  onChangeSorting,
  onChangeSortingOrder,
}) => {
  const handleASCSorting = () => {
    onChangeSortingOrder("asc");
  };

  const handleDESCSorting = () => {
    onChangeSortingOrder("desc");
  };

  return (
    <>
      <SortingContainer>
        <SortingLabel>
          SORT BY
        </SortingLabel>
        <SelectionInput value={sort} items={[{name: "Dataset", k: "dataset_name.raw", v: "asc"}, {name: "Cases", k: "case_id", v: "asc"}, {name: "Samples", k: "sample_id", v: "asc"}, {name: "Resource", k: "data_resource_id", v: "asc"}, {name: "Primary Dataset Scope", k: "primary_dataset_scope", v: "asc"}]} onChangeSorting={onChangeSorting} />
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
  onChangeSorting: PropTypes.func.isRequired,
  onChangeSortingOrder: PropTypes.func.isRequired,
};

export default Sorting;