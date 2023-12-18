import React, { useState } from 'react';

//* MUI imports
import { Box, Tab, Tabs } from '@mui/material';

//* Internal imports
import ButtonsDocs from './components/ButtonsDocs';
import { CardDocs } from './components/Carddocs';
import { ElementsDocs } from './components/ElementsDocs';
import { InputFieldDocs } from './components/InputFieldDocs';
import { MiscellaneousDocs } from './components/MiscellaneousDocs';
import { PaletteDocs } from './components/PaletteDocs';
import { PopupDocs } from './components/PopupDocs';
import { TypographyDocs } from './components/TypographyDocs';

export const Documentation = () => {
  const [value, setValue] = useState('typography');

  const handleChange = (event: React.SyntheticEvent, newValue: string) =>
    setValue(newValue);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="typography" label="Typography" />
        <Tab value="palette" label="palette" />
        <Tab value="button" label="Buttons" />
        <Tab value="dropdown" label="Dropdown" />
        <Tab value="inputField" label="Input Field" />
        <Tab value="toast" label="Toast Message" />
        <Tab value="misc" label="Miscellaneous" />
        <Tab value="cards" label="Cards" />
        <Tab value="elements" label="Elements" />
      </Tabs>
      <TabPanel value={value}>
        {value === 'typography' && <TypographyDocs />}
        {value === 'palette' && <PaletteDocs />}
        {value === 'button' && <ButtonsDocs />}
        {value === 'cards' && <CardDocs />}
        {value === 'toast' && <PopupDocs />}
        {/* {value === "dropdown" && <DropDownDocs />} */}
        {value === 'inputField' && <InputFieldDocs />}
        {/* {value === "toast" && <ToastDocs />} */}
        {value === 'misc' && <MiscellaneousDocs />}
        {value === 'elements' && <ElementsDocs />}
      </TabPanel>
    </Box>
  );
};

interface ITabPanelProps {
  children: React.ReactNode;
  id?: string;
  value: string;
}
const TabPanel = ({ children, value }: ITabPanelProps) => {
  return <Box sx={{ p: 2 }}>{children}</Box>;
};
