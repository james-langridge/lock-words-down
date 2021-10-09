import React from 'react';
import { Selection } from '../../types/terms.types';

const SelectionHeading = (selectedSelection: Selection) =>
    selectedSelection ? <h1>{selectedSelection.selectionTitle}</h1> : null;

export default SelectionHeading;
