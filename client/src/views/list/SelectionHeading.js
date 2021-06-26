import React from 'react';

const SelectionHeading = ({selectedSelection}) => {

  return (
    <>
      {selectedSelection &&
        <h1>
          {selectedSelection.selectionTitle}
        </h1>
      }
    </>
  );
};

export default SelectionHeading;
