import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FilterMenuCheckboxSection, { FilterMenuCheckboxSectionModel } from "./FilterMenuCheckboxes/FilterMenuCheckboxSection";

export interface FilterMenuSectionModel {
    sectionId: string;
    title: string;
    contentModel: FilterMenuCheckboxSectionModel;
};

export interface FilterMenuSectionProps {
    sectionConfig: FilterMenuSectionModel;
}

const FilterMenuSection = ({ sectionConfig }: FilterMenuSectionProps) => {
    const [sectionModel, setSectionModel] = useState<FilterMenuSectionModel>(sectionConfig);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${sectionModel.sectionId}-content`}
                id={`panel-${sectionModel.sectionId}-header`}
            >
                {sectionModel.title}
            </AccordionSummary>
            <AccordionDetails>...</AccordionDetails>
        </Accordion>
    );
};


export default FilterMenuSection;