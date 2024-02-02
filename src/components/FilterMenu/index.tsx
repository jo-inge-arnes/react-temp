import { useState, PropsWithChildren } from 'react';
import Stack from '@mui/material/Container';


type FilterMenuProps = {

};

const FilterMenu = (props: PropsWithChildren<FilterMenuProps>) => {
    return (
        <Stack>
            {props.children}
        </Stack>
    );
};

export default FilterMenu;