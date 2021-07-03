import React from 'react';

const SelectionHeading = ({selectedSelection}) =>
    selectedSelection ?
        <h1>{selectedSelection.selectionTitle}</h1>
        : null;

export default SelectionHeading;
