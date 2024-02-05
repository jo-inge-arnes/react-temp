import { ReactElement, PropsWithChildren, cloneElement } from 'react';
import Stack from '@mui/material/Container';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

export type FilterMenuSection = PropsWithChildren<{
    handleSelectionChanged: () => void;
    children: ReactElement<FilterMenuSectionProps> | ReactElement<FilterMenuSectionProps>[];
}>;

export type FilterMenuSectionProps = PropsWithChildren<{
    filterSectionId: string | number;
    filterSectionTitle: string;
    handleSelectionChanged?: () => void;
}>;

const FilterMenu = ({ handleSelectionChanged, children }: FilterMenuSection) => {
    const buildSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
        const { filterSectionId, filterSectionTitle } = elmt.props;
        elmt = cloneElement(elmt, { handleSelectionChanged: handleSelectionChanged });

        return (
            <Accordion key={`filtermenusection-${filterSectionId}`}>
                <AccordionSummary>
                    {filterSectionTitle}
                </AccordionSummary>
                <AccordionDetails>
                    {elmt}
                </AccordionDetails>
            </Accordion>
        );
    };

    const sections = Array.isArray(children) ? children.map(buildSection) : buildSection(children);

    return (
        <Stack>
            {sections}
        </Stack>
    );
};

export default FilterMenu;