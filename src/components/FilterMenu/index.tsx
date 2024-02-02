import { useState } from 'react';
import Stack from '@mui/material/Container';

const FilterMenu = () => {
    return (
        <Stack>
            {
                model.sectionModels.map((sectionModel) => (
                    <FilterMenuSection key={sectionModel.sectionId} sectionConfig={sectionModel} />
                ))
            }
        </Stack>
    );
};

export default FilterMenu;