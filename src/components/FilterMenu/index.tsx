import { ReactElement, PropsWithChildren } from 'react';
import Stack from '@mui/material/Container';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import FilterSettingsContext, { FilterSettings } from './FilterSettingsContext';

export type FilterMenuSection = PropsWithChildren<{
    children: ReactElement<FilterMenuSectionProps> | ReactElement<FilterMenuSectionProps>[];
}>;

export type FilterMenuSectionProps = PropsWithChildren<{
    filterSectionId: string | number;
    filterSectionTitle: string;
}>;

const FilterMenuSection = ({ filterSectionId, filterSectionTitle, children }: FilterMenuSectionProps) => {
    return (
        <Accordion key={`filtermenusection-${filterSectionId}`}>
            <AccordionSummary>
                {filterSectionTitle}
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

const buildSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
    const { filterSectionId, filterSectionTitle } = elmt.props;

    return (
        <FilterMenuSection
            filterSectionId={filterSectionId} 
            filterSectionTitle={filterSectionTitle}
        >
            {elmt}
        </FilterMenuSection>
    );
};

const FilterMenu = ({ children }: FilterMenuSection) => {
    const filterSettings = new FilterSettings();
    const sections = Array.isArray(children) ? children.map(buildSection) : buildSection(children);
    
    return (
        <Stack>
            <FilterSettingsContext.Provider value={filterSettings}>
                {sections}
            </FilterSettingsContext.Provider>
        </Stack>
    );
};

export default FilterMenu;