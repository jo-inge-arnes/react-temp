import * as React from 'react';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Button from '@mui/material/Button';

export default function FilterMenu() {
  return (
    <Container>
        <Accordion>
            <AccordionSummary>
                <h2>Filter</h2>
            </AccordionSummary>
            <AccordionDetails>
                <Button variant="contained">Hello world</Button>
            </AccordionDetails>
        </Accordion>
    </Container>
    );
}