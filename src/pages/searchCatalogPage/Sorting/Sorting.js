import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SelectionInput from '../../../components/SelectionInput';

const SortingContainer = styled.div`
  display: flex;
  float: left;
`;

const SortingLabel = styled.div`
  padding: .375rem .75rem .375rem 0;
  font-weight: 600;
  color: #8a9296;
`;

const Sorting = ({
  sort,
  onChangeSorting,
}) => {
  return (
    <>
      <SortingContainer>
        <SortingLabel>
          SORT BY
        </SortingLabel>
        <SelectionInput value={sort} items={[{name: "Dataset Type", k: "primary_dataset_scope", v: "asc"}, {name: "Resource Name", k: "data_resource_id", v: "asc"}, {name: "Update Date", k: "digest_date", v: "asc"}]} onChangeSorting={onChangeSorting} />
      </SortingContainer>
    </>
  );
};

Sorting.propTypes = {
  sort: PropTypes.object.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
};

export default Sorting;