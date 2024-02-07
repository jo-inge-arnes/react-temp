import { ReactElement, PropsWithChildren, useReducer } from 'react';
import Stack from '@mui/material/Container';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import {
    FilterSettingsContext,
    FilterSettingsDispatchContext,
    filterSettingsReducer,
    FilterSettingsValue
} from './FilterSettingsContext';

export type FilterMenuSectionType = PropsWithChildren<{
    children: ReactElement<FilterMenuSectionProps> | ReactElement<FilterMenuSectionProps>[];
}>;

export type FilterMenuSectionProps = PropsWithChildren<{
    filterSectionId: string | number;
    filterSectionTitle: string;
    filterSettingsKey?: string;
    accordion?: boolean;
}>;

const FilterMenuSection = ({ filterSectionId, filterSectionTitle, accordion, children }: FilterMenuSectionProps) => {
    if (accordion === false) {
        return (
            <Box key={`fms-box-${filterSectionId}`}>
                {children}
            </Box>
        );
    } else {
        return (
            <Accordion key={`fms-accordion-${filterSectionId}`} >
                <AccordionSummary>
                    {filterSectionTitle}
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion >
        );
    }
};

const initialFilterSelections = () => {
    return new Map<string, FilterSettingsValue[]>();
}

const buildSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
    const { filterSectionId, filterSectionTitle, accordion } = elmt.props;

    return (
        <FilterMenuSection
            filterSectionId={filterSectionId}
            filterSectionTitle={filterSectionTitle}
            accordion={accordion}
            key={`fms-${filterSectionId}`}
        >
            {elmt}
        </FilterMenuSection>
    );
};

const FilterMenu = ({ children }: FilterMenuSectionType) => {
    const [filterSettings, dispatch] = useReducer(filterSettingsReducer, initialFilterSelections());
    const sections = Array.isArray(children) ? children.map(buildSection) : buildSection(children);

    return (
        <FilterSettingsContext.Provider value={filterSettings}>
            <FilterSettingsDispatchContext.Provider value={dispatch}>
                <Stack>
                    {sections}
                </Stack>
            </FilterSettingsDispatchContext.Provider>
        </FilterSettingsContext.Provider>
    );
};

export default FilterMenu;