import { ReactElement, PropsWithChildren, useReducer } from 'react';
import Stack from '@mui/material/Container';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {
    FilterSettingsContext,
    FilterSettingsDispatchContext,
    FilterSettings,
    filterSettingsReducer
} from './FilterSettingsContext';

export type FilterMenuSection = PropsWithChildren<{
    children: ReactElement<FilterMenuSectionProps> | ReactElement<FilterMenuSectionProps>[];
}>;

export type FilterMenuSectionProps = PropsWithChildren<{
    filterSectionId: string | number;
    filterSectionTitle: string;
}>;

const FilterMenuSection = ({ filterSectionId, filterSectionTitle, children }: FilterMenuSectionProps) => {
    return (
        <Accordion key={`fms-accordion-${filterSectionId}`}>
            <AccordionSummary>
                {filterSectionTitle}
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

const initialFilterSelections = () => {
    return new FilterSettings();
}

const buildSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
    const { filterSectionId, filterSectionTitle } = elmt.props;

    return (
        <FilterMenuSection
            filterSectionId={filterSectionId}
            filterSectionTitle={filterSectionTitle}
            key={`fms-${filterSectionId}`}
        >
            {elmt}
        </FilterMenuSection>
    );
};

const FilterMenu = ({ children }: FilterMenuSection) => {
    const [filterSettings, dispatch] = useReducer(filterSettingsReducer, initialFilterSelections());
    const sections = Array.isArray(children) ? children.map(buildSection) : buildSection(children);

    return (
        <Stack>
            <FilterSettingsContext.Provider value={filterSettings}>
                <FilterSettingsDispatchContext.Provider value={dispatch}>
                    {sections}
                </FilterSettingsDispatchContext.Provider>
            </FilterSettingsContext.Provider>
        </Stack>
    );
};

export default FilterMenu;